'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, X, Plus } from 'lucide-react';
import { categories } from '@/lib/mock-data';

interface ColorEntry {
  name: string;
  hex: string;
}

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const fitOptions = ['Oversize', 'Regular', 'Slim', 'Relaxed'];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/gi, (char) => {
      const map: Record<string, string> = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo',
        ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm',
        н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
        ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch',
        ы: 'y', э: 'e', ю: 'yu', я: 'ya', ъ: '', ь: '',
      };
      return map[char.toLowerCase()] ?? char;
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function NewProduct() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorEntry[]>([{ name: '', hex: '#171717' }]);
  const [material, setMaterial] = useState('');
  const [fit, setFit] = useState('Regular');
  const [isNew, setIsNew] = useState(false);
  const [isLimited, setIsLimited] = useState(false);
  const [isBestseller, setIsBestseller] = useState(false);
  const [stock, setStock] = useState('');
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    setSlug(slugify(value));
  };

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const updateColor = (index: number, field: keyof ColorEntry, value: string) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, [field]: value } : c))
    );
  };

  const addColor = () => setColors((prev) => [...prev, { name: '', hex: '#171717' }]);
  const removeColor = (index: number) =>
    setColors((prev) => prev.filter((_, i) => i !== index));

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeImage = (index: number) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Will connect to Supabase later
    const data = {
      name,
      slug,
      description,
      price: Number(price),
      category_id: categoryId,
      sizes,
      colors: colors.filter((c) => c.name),
      material,
      fit,
      is_new: isNew,
      is_limited: isLimited,
      is_bestseller: isBestseller,
      stock: Number(stock),
      images: images.map((img) => img.file.name),
    };
    console.log('Product data:', data);
    alert('Товар сохранён (демо)');
  };

  const inputClass =
    'w-full bg-[#1a1919] border border-[rgba(72,72,71,0.2)] rounded-xl p-3 text-sm text-white placeholder:text-[#adaaaa]/60 outline-none focus:border-[#e9ffb9]/40 transition-colors';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-2 rounded-lg hover:bg-[#1a1919] transition-colors text-[#adaaaa] hover:text-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">Новый товар</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic info */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Основная информация</h2>

          <div>
            <label className="block text-xs text-[#adaaaa] mb-1.5">
              Название
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Например: Худи Cyberpunk V3"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-xs text-[#adaaaa] mb-1.5">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-xs text-[#adaaaa] mb-1.5">
              Описание
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Описание товара..."
              rows={4}
              className={inputClass + ' resize-none'}
            />
          </div>
        </section>

        {/* Pricing & Category */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Цена и категория</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#adaaaa] mb-1.5">
                Цена (сум)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="550000"
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className="block text-xs text-[#adaaaa] mb-1.5">
                Категория
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={inputClass + ' appearance-none cursor-pointer'}
                required
              >
                <option value="">Выберите категорию</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Размеры</h2>
          <div className="flex flex-wrap gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                  sizes.includes(size)
                    ? 'border-[#e9ffb9] bg-[#e9ffb9]/10 text-[#e9ffb9]'
                    : 'border-[rgba(72,72,71,0.2)] bg-[#1a1919] text-[#adaaaa] hover:text-white'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </section>

        {/* Colors */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Цвета</h2>
          <div className="space-y-3">
            {colors.map((color, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => updateColor(i, 'hex', e.target.value)}
                  className="w-10 h-10 rounded-lg border border-[rgba(72,72,71,0.2)] bg-transparent cursor-pointer flex-shrink-0"
                />
                <input
                  type="text"
                  value={color.name}
                  onChange={(e) => updateColor(i, 'name', e.target.value)}
                  placeholder="Название цвета"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={color.hex}
                  onChange={(e) => updateColor(i, 'hex', e.target.value)}
                  className={inputClass + ' w-28 flex-shrink-0'}
                />
                {colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(i)}
                    className="p-2 text-[#adaaaa] hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addColor}
            className="flex items-center gap-1.5 text-sm text-[#e9ffb9] hover:underline"
          >
            <Plus size={14} />
            Добавить цвет
          </button>
        </section>

        {/* Details */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Детали</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#adaaaa] mb-1.5">
                Материал
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="100% Хлопок"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-[#adaaaa] mb-1.5">Фит</label>
              <select
                value={fit}
                onChange={(e) => setFit(e.target.value)}
                className={inputClass + ' appearance-none cursor-pointer'}
              >
                {fitOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Flags & Stock */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Метки и остаток</h2>

          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Новинка', checked: isNew, set: setIsNew },
              { label: 'Лимитка', checked: isLimited, set: setIsLimited },
              { label: 'Бестселлер', checked: isBestseller, set: setIsBestseller },
            ].map((flag) => (
              <label
                key={flag.label}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={flag.checked}
                  onChange={(e) => flag.set(e.target.checked)}
                  className="w-4 h-4 rounded border-[rgba(72,72,71,0.4)] bg-[#1a1919] accent-[#e9ffb9]"
                />
                <span className="text-sm">{flag.label}</span>
              </label>
            ))}
          </div>

          <div className="max-w-xs">
            <label className="block text-xs text-[#adaaaa] mb-1.5">
              Остаток на складе
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </section>

        {/* Images */}
        <section className="bg-[#131313] rounded-2xl p-5 md:p-6 border border-[rgba(72,72,71,0.15)] space-y-4">
          <h2 className="text-base font-semibold mb-2">Изображения</h2>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive
                ? 'border-[#e9ffb9] bg-[#e9ffb9]/5'
                : 'border-[rgba(72,72,71,0.3)] hover:border-[rgba(72,72,71,0.5)]'
            }`}
          >
            <Upload size={32} className="mx-auto mb-3 text-[#adaaaa]" />
            <p className="text-sm text-[#adaaaa] mb-1">
              Перетащите изображения сюда
            </p>
            <p className="text-xs text-[#adaaaa]/60 mb-3">PNG, JPG до 5MB</p>
            <label className="inline-block bg-[#1a1919] border border-[rgba(72,72,71,0.2)] text-sm text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#222] transition-colors">
              Выбрать файлы
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
            </label>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <img
                    src={img.preview}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 p-1 bg-black/70 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-red-400"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-[#adaaaa]/60">
            Загрузка изображений будет подключена к Supabase Storage позже.
          </p>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="bg-[#e9ffb9] text-black px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#d6f090] transition-colors"
          >
            Сохранить
          </button>
          <Link
            href="/admin/products"
            className="border border-[rgba(72,72,71,0.3)] text-[#adaaaa] px-8 py-3 rounded-xl text-sm font-medium hover:text-white hover:border-[rgba(72,72,71,0.5)] transition-colors"
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
