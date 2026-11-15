import React, { useState } from 'react';
import { Plus, Trash2, ShieldCheck, Package, DollarSign, Tag, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useProducts } from '../context/ProductContext';

// export const Admin = () => {
const AdminDashboard = ({ onLogout }) => {
  const { products, addProduct, deleteProduct } = useProducts();

  const [form, setForm] = useState({
    name: '',
    productCode: '',
    category: 'Chiffon Hijabs',
    price: '',
    originalPrice: '',
    fabric: '',
    description: '',
    washingInstructions: 'Dry clean recommended or gentle hand wash.',
    imageUrl: '',
    isBestSeller: false,
    isNewArrival: true
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.productCode || !form.price || !form.imageUrl) {
      alert('Please fill in all required product fields.');
      return;
    }

    const newProduct = {
      name: form.name.trim(),
      productCode: form.productCode.trim(),
      category: form.category,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      fabric: form.fabric.trim() || 'Premium Quality Fabric',
      description: form.description.trim() || 'Exquisite modest fashion piece from Nuvaya.',
      washingInstructions: form.washingInstructions,
      images: [form.imageUrl.trim(), "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"],
      colors: [
        { name: "Champagne", hex: "#D4AF37" },
        { name: "Ivory", hex: "#F9F6F0" },
        { name: "Olive", hex: "#6B705C" }
      ],
      sizes: form.category.toLowerCase().includes('abaya') ? ["S", "M", "L", "XL"] : ["Free Size"],
      inStock: true,
      isBestSeller: form.isBestSeller,
      isNewArrival: form.isNewArrival
    };

    addProduct(newProduct);
    setSuccessMessage(`Successfully added "${newProduct.name}" to the Nuvaya catalog!`);
    setForm({
      name: '',
      productCode: '',
      category: 'Chiffon Hijabs',
      price: '',
      originalPrice: '',
      fabric: '',
      description: '',
      washingInstructions: 'Dry clean recommended or gentle hand wash.',
      imageUrl: '',
      isBestSeller: false,
      isNewArrival: true
    });

    setTimeout(() => setSuccessMessage(''), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-12">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-xl border border-[#EBE5DD] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#6B705C] text-white flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2C2A29]">Nuvaya Admin Dashboard</h1>
            <p className="text-xs text-[#8A8580]">Manage product catalog, inventory, pricing, and new arrivals.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">

  <div className="bg-[#F3EFEA] px-4 py-2 rounded-lg text-xs font-semibold text-[#6B705C] flex items-center gap-2">
    <Package size={16} />
    Total Catalog Products: {products.length}
  </div>

  <button
    onClick={onLogout}
    className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-100"
  >
    Logout
  </button>

</div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl flex items-center gap-3 text-sm">
          <CheckCircle size={20} className="text-emerald-600 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-xl border border-[#EBE5DD] shadow-sm space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#2C2A29] flex items-center gap-2 pb-4 border-b border-[#F3EFEA]">
          <Plus size={20} className="text-[#6B705C]" /> Add New Product
        </h2>

        <form onSubmit={handleAddProductSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="name"
                placeholder="e.g., Al-Noor Silk Hijab"
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            {/* Product Code */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Product Code <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="productCode"
                placeholder="e.g., NV-HJ-205"
                value={form.productCode}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select 
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
              >
                <option value="Premium Hijabs">Premium Hijabs</option>
                <option value="Everyday Hijabs">Everyday Hijabs</option>
                <option value="Chiffon Hijabs">Chiffon Hijabs</option>
                <option value="Jersey Hijabs">Jersey Hijabs</option>
                <option value="Modal Hijabs">Modal Hijabs</option>
                <option value="Premium Abayas">Premium Abayas</option>
                <option value="Everyday Abayas">Everyday Abayas</option>
                <option value="Open Abayas">Open Abayas</option>
                <option value="Scarves and Accessories">Scarves and Accessories</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Selling Price (₹) <span className="text-red-500">*</span>
              </label>
              <input 
                type="number" 
                name="price"
                placeholder="e.g., 899"
                value={form.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Original Price (₹) (for discount)
              </label>
              <input 
                type="number" 
                name="originalPrice"
                placeholder="e.g., 1299"
                value={form.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
              />
            </div>

            {/* Fabric */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
                Fabric Details
              </label>
              <input 
                type="text" 
                name="fabric"
                placeholder="e.g., 100% Pure Silk Chiffon"
                value={form.fabric}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
              />
            </div>

          </div>

          {/* Image URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
              Product Image URL (Unsplash or direct image link) <span className="text-red-500">*</span>
            </label>
            <input 
              type="url" 
              name="imageUrl"
              placeholder="https://images.unsplash.com/..."
              value={form.imageUrl}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C2A29] mb-1">
              Product Description
            </label>
            <textarea 
              name="description"
              rows="3"
              placeholder="Detailed description of the product..."
              value={form.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-xs bg-[#F9F6F0] border border-[#EBE5DD] rounded focus:outline-none focus:border-[#6B705C]"
            />
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#2C2A29] cursor-pointer">
              <input 
                type="checkbox" 
                name="isBestSeller"
                checked={form.isBestSeller}
                onChange={handleInputChange}
                className="accent-[#6B705C]"
              />
              Mark as Best Seller
            </label>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#2C2A29] cursor-pointer">
              <input 
                type="checkbox" 
                name="isNewArrival"
                checked={form.isNewArrival}
                onChange={handleInputChange}
                className="accent-[#6B705C]"
              />
              Mark as New Arrival
            </label>
          </div>

          <button 
            type="submit"
            className="bg-[#2C2A29] hover:bg-[#3D3A39] text-white px-8 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors shadow"
          >
            Publish Product to Store
          </button>

        </form>
      </div>

      {/* Existing Products Catalog Management */}
      <div className="bg-white p-8 rounded-xl border border-[#EBE5DD] shadow-sm space-y-6">
        <h2 className="font-serif text-xl font-bold text-[#2C2A29] pb-4 border-b border-[#F3EFEA]">
          Manage Existing Products ({products.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#F3EFEA] text-[#2C2A29] uppercase tracking-wider font-semibold">
                <th className="p-3">Image</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Code</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DD]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#F9F6F0]">
                  <td className="p-3">
                    <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded" />
                  </td>
                  <td className="p-3 font-serif font-semibold text-[#2C2A29]">{p.name}</td>
                  <td className="p-3 font-mono text-[#6B705C]">{p.productCode}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3 font-bold text-[#2C2A29]">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                          deleteProduct(p.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};


const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Nuvaya@2026";
const ADMIN_MFA_CODE = "567890";

export const Admin = () => {

  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem("nuvaya_admin_authenticated") === "true"
  );

  const [step, setStep] = useState(1);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");

  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      setStep(2);
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleMfa = (e) => {
    e.preventDefault();
    setError("");

    if (mfaCode === ADMIN_MFA_CODE) {
      sessionStorage.setItem(
        "nuvaya_admin_authenticated",
        "true"
      );

      setAuthenticated(true);
    } else {
      setError("Invalid MFA code. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("nuvaya_admin_authenticated");

    setAuthenticated(false);
    setStep(1);
    setUsername("");
    setPassword("");
    setMfaCode("");
    setError("");
  };

  // Only show dashboard after both login steps
  if (authenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 bg-[#F9F6F0]">

      <div className="w-full max-w-md bg-white border border-[#EBE5DD] rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">

          <div className="w-16 h-16 mx-auto rounded-full bg-[#6B705C] text-white flex items-center justify-center mb-4">
            <ShieldCheck size={32} />
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#2C2A29] tracking-widest">
            NUVAYA
          </h1>

          <p className="text-xs text-[#8A8580] mt-2 tracking-widest uppercase">
            Secure Admin Access
          </p>

        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 rounded-lg p-3 text-sm mb-5">
            {error}
          </div>
        )}

        {step === 1 ? (

          <form onSubmit={handleLogin} className="space-y-5">

            <h2 className="font-serif text-xl font-semibold text-[#2C2A29]">
              Admin Login
            </h2>

            <div>
              <label className="block text-xs font-semibold mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full p-3 text-sm border border-[#EBE5DD] rounded-lg bg-[#F9F6F0] outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full p-3 text-sm border border-[#EBE5DD] rounded-lg bg-[#F9F6F0] outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6B705C] hover:bg-[#555A49] text-white py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              Continue
            </button>

          </form>

        ) : (

          <form onSubmit={handleMfa} className="space-y-5">

            <div className="text-center">

              <h2 className="font-serif text-xl font-semibold text-[#2C2A29]">
                Two-Step Verification
              </h2>

              <p className="text-xs text-[#8A8580] mt-2">
                Enter your six-digit verification code.
              </p>

            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">
                MFA Verification Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                pattern="[0-9]{6}"
                value={mfaCode}
                onChange={(e) =>
                  setMfaCode(e.target.value.replace(/\D/g, ""))
                }
                placeholder="000000"
                className="w-full p-4 text-center text-2xl tracking-[0.5em] font-bold border border-[#EBE5DD] rounded-lg bg-[#F9F6F0] outline-none focus:border-[#6B705C]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6B705C] hover:bg-[#555A49] text-white py-3 rounded-lg font-semibold text-sm transition-colors"
            >
              Verify & Enter Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setMfaCode("");
                setError("");
              }}
              className="w-full text-xs text-[#8A8580] hover:text-[#6B705C]"
            >
              Back to Login
            </button>

          </form>

        )}

        <div className="mt-8 pt-5 border-t border-[#EBE5DD] text-center">
          <p className="text-[10px] text-[#A39D95] tracking-wider">
            NUVAYA ADMIN PORTAL · AUTHORIZED ACCESS ONLY
          </p>
        </div>

      </div>
    </div>
  );
};

