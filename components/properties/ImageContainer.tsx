import Image from "next/image";

function ImageContainer({ image, name }: { image: string; name: string }) {
  return (
    <section className="h-[300px} md:h-[500px] w-full relative mt-8">
      <Image src={image} alt={name} layout="fill" objectFit="cover" priority />
    </section>
  );
}

export default ImageContainer;
