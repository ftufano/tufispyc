import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ProductForm from "./Form";

export default function Create({ category }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        price: "",
        image: null,
        sort_order: 0,
        is_active: true,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.categories.products.store", category.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Nuevo producto — {category.name}
                    </h2>
                    <Link
                        href={route(
                            "admin.categories.products.index",
                            category.id,
                        )}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                        &larr; Volver
                    </Link>
                </div>
            }
        >
            <Head title="Nuevo producto" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <ProductForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Crear producto"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
