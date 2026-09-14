import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import CategoryForm from "./Form";

export default function Edit({ category }) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
        description: category.description ?? "",
        sort_order: category.sort_order,
        is_active: category.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route("admin.categories.update", category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar categoría
                </h2>
            }
        >
            <Head title="Editar categoría" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <CategoryForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Guardar cambios"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
