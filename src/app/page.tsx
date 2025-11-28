"use client";

import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, Wand2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

type UploadPanelProps = {
  title: string;
  description: string;
  hint: string;
  inputId: string;
  glow: string;
  previewSrc?: string | null;
  onFileSelect: (file: File) => void;
  onClear?: () => void;
};

const UploadPanel = ({
  title,
  description,
  hint,
  inputId,
  glow,
  previewSrc,
  onFileSelect,
  onClear,
}: UploadPanelProps) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
    event.target.value = "";
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClear?.();
  };

  return (
    <motion.div
      variants={panelVariants}
      transition={{ duration: 0.85, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-950/90 to-slate-900/70 p-6 shadow-2xl backdrop-blur-xl"
      style={{ boxShadow: `0 30px 120px -60px ${glow}` }}
    >
      <div className="flex items-center gap-3 text-white/80">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
          <Upload className="size-5 text-sky-300" />
        </div>
        <div>
          <p className="text-base font-semibold tracking-wide text-white">
            {title}
          </p>
          <p className="text-sm text-white/60">{description}</p>
        </div>
      </div>
      <label
        htmlFor={inputId}
        className="relative mt-6 flex h-44 cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/5 text-center transition hover:border-sky-400/60 hover:bg-white/10"
      >
        {previewSrc ? (
          <>
            <img
              src={previewSrc}
              alt={`${title} preview`}
              className="h-full w-full object-contain p-4"
            />
            <button
              type="button"
              aria-label="Clear image"
              onClick={handleClear}
              className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/80 backdrop-blur"
            >
              ×
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-1">
              <Upload className="size-7 text-white/80 transition group-hover:text-sky-300" />
              <p className="font-semibold tracking-wide text-white">
                Drop or browse
              </p>
            </div>
            <p className="max-w-[16rem] text-sm text-white/60">{hint}</p>
          </>
        )}
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleFileChange}
        />
      </label>
    </motion.div>
  );
};

export default function Home() {
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [personPreview, setPersonPreview] = useState<string | null>(null);
  const [garmentFile, setGarmentFile] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);

  const createPreview = (file: File, setter: (value: string | null) => void) => {
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (personFile) {
      console.log("Person image:", personFile, "type:", personFile.type);
      if (personPreview) {
        const [, personBase64 = personPreview] = personPreview.split(",");
        console.log("Person image base64:", personBase64);
      } else {
        console.log("Person image base64 not available.");
      }
    } else {
      console.log("No person image selected.");
    }
    if (garmentFile) {
      console.log("Garment image:", garmentFile, "type:", garmentFile.type);
      if (garmentPreview) {
        const [, garmentBase64 = garmentPreview] = garmentPreview.split(",");
        console.log("Garment image base64:", garmentBase64);
      } else {
        console.log("Garment image base64 not available.");
      }
    } else {
      console.log("No garment image selected.");
    }
    alert("submitting image...");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),transparent_45%),#01030d] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-sky-500/30 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-blue-600/30 blur-[150px]" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:px-10 lg:px-12">
        <motion.header
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6 text-center md:text-left"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Dress Up Darling
            </h1>
            <p className="text-lg text-white/70 sm:text-xl">
              Fuse people and garments with cinematic lighting, bold neon blues,
              and motion-reactive interface cues tailored for virtual wardrobes.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex w-full flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_60px_-40px_rgba(59,130,246,0.9)] backdrop-blur-lg md:flex-row md:items-end"
          >
            <div className="flex-1">
              <label
                htmlFor="api-key"
                className="text-xs font-semibold uppercase tracking-widest text-white/60"
              >
                Input API Key
              </label>
              <input
                id="api-key"
                name="apiKey"
                type="password"
                required
                placeholder="sk-live-xxxxxxxx"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-4 text-base text-white placeholder:text-white/40 focus:border-sky-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-base font-semibold uppercase tracking-wide text-white shadow-[0_20px_45px_-28px_rgba(56,189,248,1)] transition hover:scale-[1.02]"
            >
              Initiate Styling
            </button>
          </form>
        </motion.header>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="grid gap-8 lg:grid-cols-[minmax(300px,380px)_1fr]"
        >
          <div className="flex flex-col gap-6">
            <UploadPanel
              title="Input image of a person here"
              description="High-res portraits in PNG or WEBP"
              hint="Drag a portrait or tap to browse your files. We preserve lighting and posture."
              inputId="person-upload"
              glow="rgba(59,130,246,0.55)"
              previewSrc={personPreview}
              onFileSelect={(file) => {
                setPersonFile(file);
                createPreview(file, setPersonPreview);
              }}
              onClear={() => {
                setPersonFile(null);
                setPersonPreview(null);
              }}
            />
            <UploadPanel
              title="Input image of clothes here"
              description="Outfit flats, catalog snaps, lookbook shots"
              hint="Layer textures, fabrics, or entire looks to mix with the model."
              inputId="garment-upload"
              glow="rgba(6,182,212,0.55)"
              previewSrc={garmentPreview}
              onFileSelect={(file) => {
                setGarmentFile(file);
                createPreview(file, setGarmentPreview);
              }}
              onClear={() => {
                setGarmentFile(null);
                setGarmentPreview(null);
              }}
            />
          </div>

          <motion.div
            variants={panelVariants}
            transition={{ delay: 0.15, duration: 0.85, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-900/80 to-black/80 p-8 shadow-[0_30px_120px_-60px_rgba(14,165,233,0.8)]"
          >
            <h2 className="text-2xl font-semibold text-white">Resulting</h2>

            <div className="relative mt-8 h-[420px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),transparent_55%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(14,165,233,0.15),transparent)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <Wand2 className="size-10 text-sky-200" />
                <p className="text-2xl font-semibold tracking-wide text-white">
                  Resulting Look
                </p>
                <p className="max-w-sm text-base text-white/70">
                  Placeholder image canvas. Final render of your styled outfit
                  will appear here.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/50">
              <span className="rounded-full border border-white/10 px-3 py-1">
                4K Preview
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Neon Noir Lighting
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1">
                Physics-ready Mesh
              </span>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  );
}
