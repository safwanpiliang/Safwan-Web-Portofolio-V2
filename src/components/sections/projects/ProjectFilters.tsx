import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { SITE_LINKS } from "@/data/site";

export const ALL_CATEGORY = "All";

const FILTERS = [ALL_CATEGORY, ...PROJECT_CATEGORIES];

interface ProjectFiltersProps {
  active: string;
  onChange: (category: string) => void;
}

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center items-center">
      {FILTERS.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={active === category}
          className={`${active === category ? "bg-slate-300/25" : "hover:bg-slate-300/10"} text-slate-700 font-inter font-medium text-[12px] md:text-[14px] leading-[20px] px-3 py-1.5 md:px-4 md:py-2.5 rounded-full transition-colors`}
        >
          {category}
        </button>
      ))}

      <Button href={SITE_LINKS.behance} variant="orange" size="sm" icon={ArrowUpRight} className="shrink-0">
        Full on Behance
      </Button>
    </div>
  );
}
