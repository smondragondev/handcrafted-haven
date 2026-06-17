"use client";

import Image from "next/image";
import { useState } from "react";

type ProductImageProps = {
    src?: string;
    alt: string;
};

export function ProductImage({ src, alt }: ProductImageProps) {
    const [currentSrc, setCurrentSrc] = useState(
        src?.trim() ? src : "/image-placeholder.jpg",
    );

    return (
        <Image
            src={currentSrc}
            alt={alt}
            width={50}
            height={50}
            onError={() => setCurrentSrc("/image-placeholder.jpg")}
        />
    );
}
