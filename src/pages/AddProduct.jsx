import { useState, useRef } from "react";
import {db} from "../Firebase";
import { collection, addDoc } from "firebase/firestore";

const BRANDS = [
  "Honda",
  "Yamaha",
  "Bajaj",
  "KTM",
  "Suzuki",
  "Royal Enfield",
  "TVS",
  "Hero",
  "Vespa",
  "Other",
];
const CATEGORIES = [
  "Motorcycle",
  "Scooter",
  "Sports Bike",
  "Cruiser",
  "Electric",
];
const CONDITIONS = ["Excellent", "Good", "Fair"];

function InputField({ label, icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-[#A3A3A3] flex items-center gap-2">
        <i className={`${icon} text-primary text-xs`}></i>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "bg-[#0d0d0d] border border-[#27272a] rounded-lg px-4 py-3 text-white placeholder-[#555] text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all duration-200";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    year: "",
    price: "",
    km: "",
    condition: "",
    color: "",
    engine: "",
    description: "",
    featured: false,
    available: true,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((e) => ({
        ...e,
        image: "Please upload a valid image (JPG, PNG, WEBP)",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((e) => ({ ...e, image: "Image size must be under 5MB" }));
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors((e) => ({ ...e, image: "" }));
  };

  const handleFileInput = (e) => processFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files[0]);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Bike name is required";
    if (!form.brand) e.brand = "Select a brand";
    if (!form.category) e.category = "Select a category";
    if (!form.year || form.year < 2000 || form.year > new Date().getFullYear())
      e.year = "Enter a valid year";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      e.price = "Enter a valid price";
    if (!form.km || isNaN(form.km) || Number(form.km) < 0)
      e.km = "Enter valid km driven";
    if (!form.condition) e.condition = "Select condition";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };



  

  const uploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "bike_upload");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage();

      await addDoc(collection(db, "products"), {
        ...form,
        image: imageUrl,
        createdAt: new Date(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };




  const handleReset = () => {
    setForm({
      name: "",
      brand: "",
      category: "",
      year: "",
      price: "",
      km: "",
      condition: "",
      color: "",
      engine: "",
      description: "",
      featured: false,
      available: true,
    });
    removeImage();
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check-circle text-primary text-5xl"></i>
          </div>
          <h2 className="font-montserrat text-3xl font-bold text-white mb-3">
            Product Added!
          </h2>
          <p className="text-[#A3A3A3] mb-8">
            <span className="text-primary font-semibold">{form.name}</span> has
            been successfully listed in your showroom.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleReset}
              className="bg-primary text-[#050505] px-7 py-3 rounded-full font-semibold hover:bg-amber-500 hover:-translate-y-0.5 transition-all duration-200"
            >
              <i className="fas fa-plus mr-2"></i>Add Another
            </button>
            <a
              href="/"
              className="bg-[#1E1E1E] border border-[#27272a] text-white px-7 py-3 rounded-full font-semibold hover:border-primary transition-all duration-200"
            >
              <i className="fas fa-home mr-2"></i>Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-poppins">
      <div className="border-b border-[#27272a] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-3 font-montserrat text-xl font-bold text-primary"
          >
            <i className="fas fa-motorcycle text-2xl"></i>Best Motors
          </a>
          <div className="flex items-center gap-2 text-[#A3A3A3] text-sm">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <i className="fas fa-chevron-right text-xs text-[#444]"></i>
            <span className="text-white">Add Product</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#111] to-[#050505] border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <i className="fas fa-motorcycle text-primary text-lg"></i>
            </div>
            <h1 className="font-montserrat text-3xl md:text-4xl font-bold text-white">
              Add New Bike
            </h1>
          </div>
          <p className="text-[#A3A3A3] ml-14">
            Fill in the details below to list a bike in your showroom
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                <h2 className="font-montserrat font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-[#050505] rounded-full text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <InputField
                      label="Bike Name"
                      icon="fas fa-tag"
                      error={errors.name}
                    >
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Royal Enfield Classic 350"
                        className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
                      />
                    </InputField>
                  </div>
                  <InputField
                    label="Brand"
                    icon="fas fa-industry"
                    error={errors.brand}
                  >
                    <select
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.brand ? "border-red-500" : ""}`}
                    >
                      <option value="">Select brand</option>
                      {BRANDS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </InputField>
                  <InputField
                    label="Category"
                    icon="fas fa-layer-group"
                    error={errors.category}
                  >
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className={`${inputClass} ${errors.category ? "border-red-500" : ""}`}
                    >
                      <option value="">Select category</option>
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </InputField>
                  <InputField
                    label="Year of Manufacture"
                    icon="fas fa-calendar"
                    error={errors.year}
                  >
                    <input
                      type="number"
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      placeholder="e.g. 2020"
                      min="2000"
                      max={new Date().getFullYear()}
                      className={`${inputClass} ${errors.year ? "border-red-500" : ""}`}
                    />
                  </InputField>
                  <InputField label="Engine CC" icon="fas fa-cog">
                    <input
                      type="text"
                      name="engine"
                      value={form.engine}
                      onChange={handleChange}
                      placeholder="e.g. 350cc"
                      className={inputClass}
                    />
                  </InputField>
                  <InputField label="Color" icon="fas fa-palette">
                    <input
                      type="text"
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="e.g. Matte Black"
                      className={inputClass}
                    />
                  </InputField>
                </div>
              </div>

              <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                <h2 className="font-montserrat font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-[#050505] rounded-full text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Condition & Pricing
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Asking Price (₹)"
                    icon="fas fa-rupee-sign"
                    error={errors.price}
                  >
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g. 145000"
                      className={`${inputClass} ${errors.price ? "border-red-500" : ""}`}
                    />
                  </InputField>
                  <InputField
                    label="KM Driven"
                    icon="fas fa-road"
                    error={errors.km}
                  >
                    <input
                      type="number"
                      name="km"
                      value={form.km}
                      onChange={handleChange}
                      placeholder="e.g. 15000"
                      className={`${inputClass} ${errors.km ? "border-red-500" : ""}`}
                    />
                  </InputField>
                  <div className="sm:col-span-2">
                    <InputField
                      label="Condition"
                      icon="fas fa-star"
                      error={errors.condition}
                    >
                      <div className="flex gap-3">
                        {CONDITIONS.map((c) => (
                          <label
                            key={c}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border cursor-pointer text-sm font-medium transition-all duration-200 ${form.condition === c ? "border-primary bg-primary/10 text-primary" : "border-[#27272a] text-[#A3A3A3] hover:border-[#444]"}`}
                          >
                            <input
                              type="radio"
                              name="condition"
                              value={c}
                              checked={form.condition === c}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <i
                              className={`fas ${c === "Excellent" ? "fa-trophy" : c === "Good" ? "fa-thumbs-up" : "fa-wrench"} text-xs`}
                            ></i>
                            {c}
                          </label>
                        ))}
                      </div>
                    </InputField>
                  </div>
                </div>
              </div>

              <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                <h2 className="font-montserrat font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-[#050505] rounded-full text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Description
                </h2>
                <InputField label="Bike Description" icon="fas fa-align-left">
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe the bike's condition, history, features, modifications etc..."
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                </InputField>
                <p className="text-[#555] text-xs mt-2">
                  {form.description.length}/500 characters
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                <h2 className="font-montserrat font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-[#050505] rounded-full text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  Photo
                </h2>

                {imagePreview ? (
                  <div className="relative rounded-xl overflow-hidden h-52 mb-3 group">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 rounded-full border border-white/20 transition-all"
                      >
                        <i className="fas fa-exchange-alt mr-2"></i>Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-400 text-xs px-4 py-2 rounded-full border border-red-500/30 transition-all"
                      >
                        <i className="fas fa-trash mr-2"></i>Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`h-52 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 mb-3 ${dragOver ? "border-primary bg-primary/10 scale-[1.02]" : "border-[#333] hover:border-primary/50 hover:bg-primary/5"} ${errors.image ? "border-red-500/50" : ""}`}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${dragOver ? "bg-primary/20" : "bg-[#1a1a1a]"}`}
                    >
                      <i
                        className={`fas fa-cloud-upload-alt text-2xl transition-colors ${dragOver ? "text-primary" : "text-[#555]"}`}
                      ></i>
                    </div>
                    <div className="text-center px-4">
                      <p className="text-white text-sm font-medium">
                        {dragOver
                          ? "Drop it here!"
                          : "Drag & drop or click to upload"}
                      </p>
                      <p className="text-[#555] text-xs mt-1">
                        JPG, PNG, WEBP — max 5MB
                      </p>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  className="hidden"
                />

                {errors.image && (
                  <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.image}
                  </p>
                )}

                {imageFile && (
                  <div className="flex items-center gap-2 bg-[#0d0d0d] rounded-lg px-3 py-2 mt-2">
                    <i className="fas fa-image text-primary text-xs"></i>
                    <span className="text-[#A3A3A3] text-xs truncate flex-1">
                      {imageFile.name}
                    </span>
                    <span className="text-[#555] text-xs shrink-0">
                      {(imageFile.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                )}

                {!imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full mt-3 py-2.5 rounded-xl border border-[#27272a] text-[#A3A3A3] text-sm hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <i className="fas fa-folder-open mr-2"></i>Browse Files
                  </button>
                )}
              </div>

              <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6">
                <h2 className="font-montserrat font-semibold text-white mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-[#050505] rounded-full text-xs flex items-center justify-center font-bold">
                    5
                  </span>
                  Listing Options
                </h2>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      name: "featured",
                      label: "Mark as Featured",
                      desc: "Show in homepage spotlight",
                      icon: "fas fa-star",
                    },
                    {
                      name: "available",
                      label: "Available for Sale",
                      desc: "Visible to customers",
                      icon: "fas fa-check-circle",
                    },
                  ].map((opt) => (
                    <label
                      key={opt.name}
                      className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${form[opt.name] ? "border-primary/50 bg-primary/5" : "border-[#27272a] hover:border-[#444]"}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${form[opt.name] ? "bg-primary text-[#050505]" : "bg-[#1a1a1a] text-[#555]"}`}
                      >
                        <i className={`${opt.icon} text-sm`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {opt.label}
                        </p>
                        <p className="text-xs text-[#A3A3A3]">{opt.desc}</p>
                      </div>
                      <div
                        className={`w-11 h-6 rounded-full relative transition-all duration-300 shrink-0 ${form[opt.name] ? "bg-primary" : "bg-[#333]"}`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${form[opt.name] ? "left-6" : "left-1"}`}
                        ></div>
                      </div>
                      <input
                        type="checkbox"
                        name={opt.name}
                        checked={form[opt.name]}
                        onChange={handleChange}
                        className="sr-only"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {form.price && (
                <div className="bg-gradient-to-br from-primary/10 to-amber-600/5 border border-primary/20 rounded-2xl p-6">
                  <p className="text-xs text-[#A3A3A3] uppercase tracking-widest mb-1">
                    Listed Price
                  </p>
                  <p className="font-montserrat text-3xl font-bold text-primary">
                    ₹{Number(form.price).toLocaleString("en-IN")}
                  </p>
                  {form.name && (
                    <p className="text-[#A3A3A3] text-sm mt-1">{form.name}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#111] border border-[#1f1f1f] rounded-2xl p-5">
            <p className="text-[#555] text-sm">
              <i className="fas fa-info-circle text-primary mr-2"></i>
              All required fields must be filled before submitting.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-[#27272a] text-[#A3A3A3] text-sm font-medium hover:border-[#444] hover:text-white transition-all duration-200"
              >
                <i className="fas fa-undo mr-2"></i>Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-[#050505] px-8 py-2.5 rounded-full font-semibold text-sm hover:bg-amber-500 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(245,158,11,0.3)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 min-w-[140px] justify-center"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Saving...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus"></i> Add Bike
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
