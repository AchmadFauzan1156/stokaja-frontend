"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import TextBox from "@/components/TextBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { apiPost, apiPut, apiDelete } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/Toast";

function AddressEditForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  
  const { user, refreshProfile } = useAuth();
  const { showSuccess, showError } = useToast();

  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id && user?.addresses) {
      const existing = user.addresses.find((a) => a.id === id);
      if (existing) {
        setLabel(existing.label || "");
        setAddress(existing.address || "");
      }
    }
  }, [id, user]);

  const handleSave = async () => {
    if (!label || !address) {
      showError("Label dan Alamat wajib diisi");
      return;
    }

    setIsSaving(true);
    try {
      const payload = { label, alamatDetail: address };
      
      if (id) {
        // Edit
        await apiPut(`/users/profil/alamat/${id}`, payload);
        showSuccess("Alamat berhasil diperbarui");
      } else {
        // Create
        await apiPost("/users/profil/alamat", payload);
        showSuccess("Alamat berhasil ditambahkan");
      }
      
      await refreshProfile();
      router.push("/profile-address");
    } catch (error) {
      showError(error.message || "Gagal menyimpan alamat");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!confirm("Apakah Anda yakin ingin menghapus alamat ini?")) return;

    setIsDeleting(true);
    try {
      await apiDelete(`/users/profil/alamat/${id}`);
      showSuccess("Alamat berhasil dihapus");
      await refreshProfile();
      router.push("/profile-address");
    } catch (error) {
      showError(error.message || "Gagal menghapus alamat");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        <TextBox
          placeholder="Label Alamat (contoh: Rumah, Kantor)"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <TextBox
          multiline
          placeholder="Alamat Lengkap"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="h-40"
        />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex gap-4">
          <Button text="Batal" variant="secondary" onClick={() => router.back()} className="flex-1 w-full" />
          {isSaving ? (
            <div className="flex-1 flex justify-center py-3">
              <LoadingSpinner size="md" />
            </div>
          ) : (
            <Button text="Simpan" onClick={handleSave} className="flex-1 w-full" />
          )}
        </div>
        
        {id && (
          <div className="flex justify-center mt-4">
            {isDeleting ? (
              <LoadingSpinner size="sm" />
            ) : (
              <button 
                onClick={handleDelete}
                className="font-signika text-red-500 font-semibold underline"
              >
                Hapus Alamat Ini
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default function AddressEditPage() {
  return (
    <div className="min-h-screen bg-[#F0E7D6] px-5 pt-14">
      <h1 className="font-squadaOne text-[36px] text-[#6E822E]">Alamat</h1>
      <Suspense fallback={<div className="mt-10 flex justify-center"><LoadingSpinner size="lg" /></div>}>
        <AddressEditForm />
      </Suspense>
    </div>
  );
}