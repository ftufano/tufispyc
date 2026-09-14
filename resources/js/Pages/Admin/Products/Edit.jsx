import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import ProductForm from "./Form";

export default function Edit({ product, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: "put",
        category_id: product.category_id,
        name: product.name,
        description: product.description ?? "",
        price: product.price,
        image: null,
        remove_image: false,
        sort_order: product.sort_order,
        is_active: product.is_active,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.products.update", product.id), {
            forceFormData: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Editar producto — {product.name}
                    </h2>
                    <Link
                        href={route(
                            "admin.categories.products.index",
                            product.category_id,
                        )}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                        &larr; Volver
                    </Link>
                </div>
            }
        >
            <Head title="Editar producto" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow-sm sm:rounded-lg">
                        <ProductForm
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            onSubmit={submit}
                            submitLabel="Guardar cambios"
                            categories={categories}
                            currentImageUrl={product.image_url}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
