export default function Footer() {
    return (
      <footer className="bg-gray-100 text-sm text-gray-600 p-6 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-bold text-black mb-2">ShopSphere</h3>
            <p>Elegant pink origami design three dimensional view and decoration co-exist. Great for adding a decorative touch to any room's decor.</p>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-2">Information</h4>
            <ul>
              <li>Custom Service</li>
              <li>FAQs</li>
              <li>Ordering Tracking</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-2">My Account</h4>
            <ul>
              <li>Delivery Info</li>
              <li>Privacy Policy</li>
              <li>Discount</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-black mb-2">Newsletter</h4>
            <input type="text" placeholder="Enter email" className="border rounded px-2 py-1 w-full mb-2" />
            <button className="bg-pink-600 text-white hover:bg-pink-700 px-4 py-2 rounded">Subscribe</button>
          </div>
        </div>
      </footer>
    )
  }
