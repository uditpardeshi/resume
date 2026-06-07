import { FloatingInput } from "@/components/ui/floating-input";
import { useResumeStore } from "@/store/useResumeStore";

export function Step1Personal() {
  const { data, setData } = useResumeStore();
  const p = data.personal;
  const update = (k: keyof typeof p, v: string) =>
    setData((d) => ({ ...d, personal: { ...d.personal, [k]: v } }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Personal Details</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Provide your basic contact and demographic details.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
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
        <FloatingInput
          label="Marital Status"
          required
          value={p.maritalStatus}
          maxLength={50}
          onChange={(e) => update("maritalStatus", e.target.value)}
          placeholder="e.g. Single / Married"
        />
      </div>
    </div>
  );
}
