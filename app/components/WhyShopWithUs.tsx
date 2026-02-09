import { ShieldCheck, TruckIcon, RotateCcw, HeartHandshake, Award, Package } from "lucide-react";

const features = [
  {
    icon: HeartHandshake,
    title: "Support Local Artisans",
    description: "100% of profits go directly to women artisans",
  },
  {
    icon: Award,
    title: "100% Authentic",
    description: "Every product is genuinely handmade with care",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Strict quality checks on every single item",
  },
  {
    icon: TruckIcon,
    title: "Free Shipping",
    description: "Free delivery on orders above ₹999",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
  {
    icon: Package,
    title: "Secure Packaging",
    description: "Items carefully packed to reach you safely",
  },
];

export function WhyShopWithUs() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-blue dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl mb-2 dark:text-gray-100">Why Shop With Nirmatri</h2>
          <p className="text-gray-600 dark:text-gray-400">More than just shopping - its about making an impact</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-400 mb-4 group-hover:bg-blue-900 dark:group-hover:bg-blue-800 group-hover:text-white transition-colors duration-300">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-sm mb-2">{feature.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}