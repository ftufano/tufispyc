import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function ProductForm({
    data,
    setData,
    errors,
    processing,
    onSubmit,
    submitLabel,
    categories,
    currentImageUrl,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-6">
            {categories && (
                <div>
                    <InputLabel htmlFor="category_id" value="Categoría" />
                    <select
                        id="category_id"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.category_id} className="mt-2" />
                </div>
            )}

            <div>
                <InputLabel htmlFor="name" value="Nombre" />
                <TextInput
                    id="name"
                    className="mt-1 block w-full"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    isFocused
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="description" value="Descripción" />
                <textarea
                    id="description"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    value={data.description}
                    onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="price" value="Precio" />
                <TextInput
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    className="mt-1 block w-full"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                />
                <InputError message={errors.price} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="sort_order" value="Orden" />
                <TextInput
                    id="sort_order"
                    type="number"
                    className="mt-1 block w-full"
                    value={data.sort_order}
                    onChange={(e) => setData("sort_order", e.target.value)}
                />
                <InputError message={errors.sort_order} className="mt-2" />
            </div>

            <div className="flex items-center">
                <input
                    id="is_active"
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                    checked={data.is_active}
                    onChange={(e) => setData("is_active", e.target.checked)}
                />
                <label
                    htmlFor="is_active"
                    className="ms-2 text-sm text-gray-600"
                >
                    Visible en el menú público
                </label>
            </div>

            <div>
                <InputLabel htmlFor="image" value="Imagen de referencia" />
                {currentImageUrl && (
                    <img
                        src={currentImageUrl}
                        alt=""
                        className="mt-2 h-32 w-32 rounded-md object-cover"
                    />
                )}
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="mt-2 block w-full text-sm text-gray-600"
                    onChange={(e) => setData("image", e.target.files[0])}
                />
                <InputError message={errors.image} className="mt-2" />

                {currentImageUrl && "remove_image" in data && (
                    <label className="mt-2 flex items-center text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="me-2 rounded border-gray-300 text-red-600 shadow-sm focus:ring-red-500"
                            checked={data.remove_image}
                            onChange={(e) =>
                                setData("remove_image", e.target.checked)
                            }
                        />
                        Quitar imagen actual
                    </label>
                )}
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>
                    {submitLabel}
                </PrimaryButton>
            </div>
        </form>
    );
}
