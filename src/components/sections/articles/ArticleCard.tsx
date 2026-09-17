"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CARD_GRID_IMAGE_SIZES, TiltCard } from "@/components/ui/TiltCard";
import type { Article } from "@/data/articles";

export function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <TiltCard revealDelay={index * 0.1}>
      <div className="w-full h-25 sm:h-30 md:h-37 overflow-hidden bg-white relative shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes={CARD_GRID_IMAGE_SIZES}
          className="object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
        />
      </div>

      <div className="flex flex-col gap-2 px-2 flex-grow">
        <p className="font-montserrat font-semibold text-[11px] md:text-[12px] leading-[normal] text-slate-600">
          {article.readTime}
        </p>
        <h3 className="font-montserrat font-semibold text-[12px] sm:text-[16px] md:text-[20px] leading-[16px] sm:leading-[24px] text-slate-800 line-clamp-2">
          {article.title}
        </h3>
      </div>

      <div className="flex items-center justify-end w-full px-2 mt-auto shrink-0">
        <Button href={article.link} variant="orange" size="xs" icon={ArrowUpRight}>
          Read on Medium
        </Button>
      </div>
    </TiltCard>
  );
}
