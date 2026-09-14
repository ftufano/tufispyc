import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import CategoryForm from "./Form";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        sort_order: 0,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Nueva categoría
                </h2>
            }
        >
            <Head title="Nueva categoría" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <CategoryForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Crear categoría"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
