export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300">
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold text-amber-600">
          साहित्य सृजन व संवाद
        </h2>
        <p className="mt-1 text-sm text-zinc-400">
          कला संस्कृति चिंतन का पोर्टल!
        </p>

        <div className="mt-6 text-sm leading-7">
          <p>
            <span className="text-zinc-500">संपादक:</span> राजीव कुमार झा
          </p>
          <p>
            <span className="text-zinc-500">संपर्क:</span> इंदुपुर, पोस्ट:
            बड़हिया, जिला: लखीसराय, बिहार 811302
          </p>
          <p>
            <span className="text-zinc-500">मोबाइल:</span> 6206756085
          </p>
        </div>

        <div className="mt-8 border-t border-zinc-700 pt-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} साहित्य सृजन व संवाद। सर्वाधिकार
            सुरक्षित।
          </p>
          <p className="mt-1">
            निर्माण —{" "}
            <a
              href="https://nishantsoftwares.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300"
            >
              निशांत सॉफ्टवेयर्स
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}