import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ category, products }) {
    const destroy = (product) => {
        if (confirm(`¿Eliminar el producto "${product.name}"?`)) {
            router.delete(route("admin.products.destroy", product.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Productos — {category.name}
                    </h2>
                    <Link
                        href={route("admin.categories.index")}
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                    >
                        &larr; Volver a categorías
                    </Link>
                </div>
            }
        >
            <Head title={`Productos — ${category.name}`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <Link
                            href={route(
                                "admin.categories.products.create",
                                category.id,
                            )}
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-700"
                        >
                            Nuevo producto
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3" />
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Nombre
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Precio
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Estado
                                    </th>
                                    <th className="px-6 py-3" />
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            {product.image_url ? (
                                                <img
                                                    src={product.image_url}
                                                    alt=""
                                                    className="h-12 w-12 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-100" />
                                            )}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {product.description}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            ${Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <span
                                                className={
                                                    "inline-flex rounded-full px-2 text-xs font-semibold leading-5 " +
                                                    (product.is_active
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-gray-100 text-gray-800")
                                                }
                                            >
                                                {product.is_active
                                                    ? "Activo"
                                                    : "Oculto"}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium space-x-4">
                                            <Link
                                                href={route(
                                                    "admin.products.edit",
                                                    product.id,
                                                )}
                                                className="text-gray-600 hover:text-gray-900"
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => destroy(product)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {products.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No hay productos en esta categoría
                                            todavía.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
