// src/components/PropertyTypesSection.tsx
import React from "react";

// Drop your downloaded illustration assets in src/assets/property-types/
// and point these imports at them.
import ResidentialIcon from "@/assets/property-types/residential.png";
import CommercialIcon from "@/assets/property-types/commercial.png";
import IndustrialIcon from "@/assets/property-types/industrial.png";
import GlassCard from "@/components/ui/glassCard";

interface PropertyType {
	icon: string;
	title: string;
	description: string;
	count: number;
}

// Replace `count` with real data from your API/store once available.
const propertyTypes: PropertyType[] = [
	{
		icon: ResidentialIcon,
		title: "Residential",
		description: "Houses, apartments, duplexes and more.",
		count: 12,
	},
	{
		icon: CommercialIcon,
		title: "Commercial",
		description: "Shops, offices, plazas and more.",
		count: 4,
	},
	{
		icon: IndustrialIcon,
		title: "Industrial",
		description: "Warehouses, factories and large facilities.",
		count: 2,
	},
];


const PropertyTypeCard: React.FC<{ type: PropertyType }> = ({ type }) => {
  return (
    <GlassCard variant="surface">
      <div className="relative flex items-center gap-5">
        <img src={type.icon} alt="" className="h-[100px] w-[100px] shrink-0 object-contain drop-shadow-[0_10px_18px_rgba(16,185,129,0.2)] sm:h-[112px] sm:w-[112px]"/>
        <div className="min-w-0">
          <h3 className="text-[18px] font-semibold text-white">{type.title}</h3>
          <p className="mt-1.5 text-sm leading-7 text-white/65">{type.description}</p>
          <span className="mt-4 inline-flex items-center rounded-xl border border-white/12 bg-black/10 px-4 py-1 text-xs text-white/70">
            {type.count} {type.count === 1 ? "Property" : "Properties"}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

	const PropertyTypesSection: React.FC = () => {
	return (
		<section className="relative   overflow-hidden  ">
			{" "}
			{/* section background: subtle pattern + top-down gradient, sits behind content */}
			<div className="mx-auto max-w-[1300px] px-8 space-y-12 xl:px-12">
		 
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
				style={{
					backgroundImage: "url('/patterns/property-icons-tile.svg')",
					backgroundRepeat: "repeat",
					backgroundSize: "220px",
				}}
			/>
			<div className="text-center">
				<span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
					All your properties
				</span>
				<h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
					Everything begins with your properties.
				</h2>
			</div>
<div className="
 grid
grid-cols-1
gap-8
sm:grid-cols-2
xl:grid-cols-3
">				{propertyTypes.map((type) => (
					<PropertyTypeCard key={type.title} type={type} />
				))}
			</div></div>
		</section>
	);
};

export default PropertyTypesSection;
