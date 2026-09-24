import { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(price));
}

function ProductCard({ product }) {
    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-rose-100 transition hover:shadow-md">
            {product.image_url ? (
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-48 w-full object-cover"
                />
            ) : (
                <div className="flex h-48 w-full items-center justify-center bg-rose-50 text-rose-200">
                    <span className="text-sm">Sin imagen</span>
                </div>
            )}
            <div className="flex flex-1 flex-col gap-2 p-5">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-lg text-gray-900">
                        {product.name}
                    </h3>
                    <span className="whitespace-nowrap font-semibold text-rose-600">
                        {formatPrice(product.price)}
                    </span>
                </div>
                {product.description && (
                    <p className="text-sm leading-relaxed text-gray-500">
                        {product.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default function Menu({ categories }) {
    const { auth } = usePage().props;
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        function updateScrollTopVisibility() {
            setShowScrollTop(window.scrollY > 200);
        }

        updateScrollTopVisibility();
        window.addEventListener("scroll", updateScrollTopVisibility, {
            passive: true,
        });

        return () =>
            window.removeEventListener("scroll", updateScrollTopVisibility);
    }, []);

    function scrollToCategory(event, slug) {
        event.preventDefault();
        document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", `#${slug}`);
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.replaceState(
            null,
            "",
            `${window.location.pathname}${window.location.search}`,
        );
    }

    return (
        <>
            <Head title="Tortas • Desayunos • Arreglos de cumpleaños" />

            <div className="min-h-screen bg-rose-50/40">
                <header className="border-b border-rose-100 bg-white">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
                        <img
                            src="/images/tufis-logo.png"
                            alt="Tufi's Postres y Cupcakes"
                            className="h-16 w-16 object-contain"
                        />
                        {auth?.user ? (
                            <Link
                                href={route("dashboard")}
                                className="text-sm font-medium text-rose-600 hover:text-rose-800"
                            >
                                Panel de administración
                            </Link>
                        ) : (
                            <Link
                                href={route("login")}
                                className="text-sm font-medium text-gray-400 hover:text-rose-600"
                            >
                                Acceso staff
                            </Link>
                        )}
                    </div>

                    {categories.length > 0 && (
                        <nav className="border-t border-rose-100 bg-white">
                            <div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2 overflow-x-auto px-6 py-3">
                                {categories.map((category) => (
                                    <a
                                        key={category.id}
                                        href={`#${category.slug}`}
                                        onClick={(event) =>
                                            scrollToCategory(
                                                event,
                                                category.slug,
                                            )
                                        }
                                        className="whitespace-nowrap text-sm font-medium uppercase tracking-wide text-gray-500 hover:text-rose-600"
                                    >
                                        {category.name}
                                    </a>
                                ))}
                            </div>
                        </nav>
                    )}
                </header>

                <section className="mx-auto max-w-6xl px-6 py-14 text-center">
                    <h1 className="font-serif text-4xl text-gray-900 sm:text-5xl">
                        Nuestro Menú
                    </h1>
                    <p className="mx-auto mt-4 max-w-2xl text-gray-500">
                        Tartaletas, brownies, mini pavlovas y trufas hechas a
                        mano, con los mejores ingredientes, listas para tu
                        próxima celebración.
                    </p>
                </section>

                <main className="mx-auto max-w-6xl space-y-16 px-6 pb-20">
                    {categories.map((category) => (
                        <section
                            key={category.id}
                            id={category.slug}
                            className="scroll-mt-32"
                        >
                            <div className="mb-6 text-center">
                                <h2 className="font-serif text-3xl text-gray-900">
                                    {category.name}
                                </h2>
                                {category.description && (
                                    <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                                        {category.description}
                                    </p>
                                )}
                            </div>

                            {category.products.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {category.products.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-sm text-gray-400">
                                    Próximamente nuevos productos en esta
                                    categoría.
                                </p>
                            )}
                        </section>
                    ))}

                    {categories.length === 0 && (
                        <p className="text-center text-gray-400">
                            El menú estará disponible muy pronto.
                        </p>
                    )}
                </main>

                {showScrollTop && (
                    <button
                        type="button"
                        onClick={scrollToTop}
                        aria-label="Volver arriba"
                        title="Volver arriba"
                        className="fixed bottom-6 right-6 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-2xl leading-none text-white shadow-lg transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-offset-2"
                    >
                        &#8593;
                    </button>
                )}

                <footer className="border-t border-rose-100 bg-white py-8 text-center text-sm text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Tufis — Hecho por Caelum
                        Dev.
                    </p>
                </footer>
            </div>
        </>
    );
}
