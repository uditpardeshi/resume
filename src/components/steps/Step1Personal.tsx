import { useRef } from "react";
import { FloatingInput } from "@/components/ui/floating-input";
import { useResumeStore } from "@/store/useResumeStore";
import { cn } from "@/lib/utils";
import { Trash2, Camera, MoveLeft, MoveRight } from "lucide-react";
import { toast } from "sonner";

export function Step1Personal() {
  const { data, setData } = useResumeStore();
  const p = data.personal;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof typeof p>(k: K, v: typeof p[K]) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [k]: v } }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (PNG/JPEG).");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        update("photo", event.target.result as string);
        toast.success("Photo uploaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    update("photo", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Photo removed.");
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Personal Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide your basic contact and demographic details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
          <FloatingInput
            label="Full name"
            required
            value={p.fullName}
            maxLength={100}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="e.g. Priya Sharma"
          />
          <FloatingInput
            label="Mobile Number"
            required
            value={p.phone}
            maxLength={20}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="e.g. +91 98765 43210"
          />
          <FloatingInput
            label="Email ID"
            required
            type="email"
            value={p.email}
            maxLength={120}
            onChange={(e) => update("email", e.target.value)}
            placeholder="e.g. priya@example.com"
          />
          <FloatingInput
            label="Address"
            required
            value={p.address}
            maxLength={200}
            onChange={(e) => update("address", e.target.value)}
            placeholder="e.g. 123, MG Road, Bengaluru, India"
          />
          <FloatingInput
            label="Date of birth"
            required
            value={p.dob}
            maxLength={50}
            onChange={(e) => update("dob", e.target.value)}
            placeholder="e.g. 15th August 1998"
          />
          <FloatingInput
            label="Languages Known"
            required
            value={p.languages}
            maxLength={150}
            onChange={(e) => update("languages", e.target.value)}
            placeholder="e.g. English, Hindi, Kannada"
          />
        </div>

        {/* Right Column: Photo Upload Section */}
        <div className="lg:col-span-1 space-y-4">
          <label className="text-xs font-semibold text-foreground/80 uppercase tracking-wider block">
            Resume Photo (Optional)
          </label>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!p.photo ? (
            <div
              onClick={triggerFileInput}
              className="border-2 border-dashed border-border/80 rounded-xl p-6 text-center hover:border-saffron hover:bg-saffron/5 cursor-pointer transition-all duration-200 group relative flex flex-col items-center justify-center min-h-[160px] bg-secondary/5"
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 group-hover:bg-saffron/10 group-hover:text-saffron transition-all duration-200 mb-3 text-muted-foreground">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-saffron transition-colors">
                Upload Photo
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                PNG or JPEG, max 2MB
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative flex items-center justify-center p-4 border border-border/80 rounded-xl bg-secondary/5 min-h-[160px]">
                <div
                  className="relative rounded-lg overflow-hidden border border-border bg-paper shadow-md transition-all duration-150"
                  style={{
                    width: `${p.photoSize || 80}px`,
                    height: `${p.photoSize || 80}px`,
                  }}
                >
                  <img
                    src={p.photo}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-150 text-white rounded-lg cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              </div>

              {/* Sizing Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground font-semibold">
                  <span>Size: {p.photoSize || 80}px</span>
                  <span>(40px - 150px)</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={150}
                  value={p.photoSize || 80}
                  onChange={(e) => update("photoSize", parseInt(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-saffron"
                />
              </div>

              {/* Positioning Toggle */}
              <div className="space-y-2">
                <span className="text-xs text-muted-foreground font-semibold block">
                  Position in Resume
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => update("photoPosition", "left")}
                    className={cn(
                      "py-1.5 px-3 text-xs font-semibold border rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      p.photoPosition === "left"
                        ? "bg-primary border-primary text-primary-foreground shadow-sm font-semibold"
                        : "bg-paper hover:bg-secondary/50 text-muted-foreground hover:text-foreground border-border",
                    )}
                  >
                    <MoveLeft className="w-3.5 h-3.5" /> Left
                  </button>
                  <button
                    type="button"
                    onClick={() => update("photoPosition", "right")}
                    className={cn(
                      "py-1.5 px-3 text-xs font-semibold border rounded-md transition-all flex items-center justify-center gap-1.5 cursor-pointer",
                      p.photoPosition === "right"
                        ? "bg-primary border-primary text-primary-foreground shadow-sm font-semibold"
                        : "bg-paper hover:bg-secondary/50 text-muted-foreground hover:text-foreground border-border",
                    )}
                  >
                    Right <MoveRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
