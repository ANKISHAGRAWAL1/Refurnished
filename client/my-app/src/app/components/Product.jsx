export default function ProductSection() {
  const products = [
    {
      id: 1,
      name: "Dell Latitude 7490",
      image: "/laptop1.jpg",
      price: "₹29,999",
      oldPrice: "₹39,999",
      condition: "Excellent",
    },
    {
      id: 2,
      name: "HP EliteBook 840 G5",
      image: "/laptop2.jpg",
      price: "₹27,499",
      oldPrice: "₹35,999",
      condition: "Good",
    },
    {
      id: 3,
      name: "Lenovo ThinkPad T480",
      image: "/laptop3.jpg",
      price: "₹31,999",
      oldPrice: "₹42,999",
      condition: "Like New",
    },
    {
      id: 4,
      name: "Dell OptiPlex Desktop",
      image: "/desktop1.jpg",
      price: "₹22,999",
      oldPrice: "₹30,999",
      condition: "Excellent",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Featured Products
          </h2>
          <p className="text-gray-500 mt-3">
            Premium refurbished laptops and desktops at affordable prices.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5">
                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  {product.condition}
                </span>

                <h3 className="text-xl font-semibold mt-4">
                  {product.name}
                </h3>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <span className="text-gray-400 line-through">
                    {product.oldPrice}
                  </span>
                </div>

                <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}