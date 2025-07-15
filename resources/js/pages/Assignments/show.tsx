import { Approval, Assignments, print, SettingApproval } from "@/types";
import { useRef } from "react";
import SignatureCanvas from 'react-signature-canvas'
import { Head, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";

interface PrintAssignments {
  assignments: print,
  settingApproval: SettingApproval[],
  approvals: Approval[],
}

export default function show({ assignments, settingApproval, approvals }: PrintAssignments) {
  console.log(settingApproval);
  const sigPad = useRef<SignatureCanvas>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const signature = sigPad.current?.toDataURL('image/png');
    // setData('signature', signature || '');

    router.post(route('approval.store'), {
      signature: signature || '',
      user_id: assignments.received_by.id,
      assignment_id: assignments.id,
    }, {
      onSuccess: () => {
        toast.success('approval created successfully');
        setIsDialogOpen(false);
      },
      onError: () => {
        toast.error('Failed to create approval');
      },
    });
  };

  const clearSignature = () => {
    sigPad.current?.clear();
    // setData('signature', '');
  };

 
  return (
    <>
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl space-y-6 text-sm">
        <h1 className="text-2xl font-bold text-center">
         <u>SERAH TERIMA FASILITAS PERUSAHAAN</u>
        </h1>

        <p>Yang bertandatangan di bawah ini:</p>

        {/* Pihak Pertama */}
        <div>
          <h2 className="font-semibold">Pihak Pertama:</h2>
          <div className="grid grid-cols-[160px_10px_1fr] gap-2">
            <div>Nama</div><div>:</div><div>{assignments.user.name}</div>
            <div>Jabatan</div><div>:</div><div>{assignments.user.position}</div>
            <div>Departemen</div><div>:</div><div>{assignments.user.departement}</div>
          </div>
        </div>
        <p>
          Dalam hal ini bertindak untuk dan atas nama <b>{assignments.user.business_unit}</b> sesuai dengan kewenangan jabatannya yang selanjutnya disebut sebagai <b><u>Pihak Pertama</u></b> atau <b><u>Yang Menyerahkan</u></b>
        </p>

        {/* Pihak Kedua */}
        <div>
          <h2 className="font-semibold">Pihak Kedua:</h2>
          <div className="grid grid-cols-[160px_10px_1fr] gap-2">
            <div>Nama</div><div>:</div><div>{assignments.received_by.name}</div>
            <div>Jabatan</div><div>:</div><div>{assignments.received_by.position}</div>
            <div>Departemen</div><div>:</div><div>{assignments.received_by.departement}</div>
            <div>Alamat</div><div>:</div><div>{assignments.received_by.address}</div>
          </div>
        </div>

        <p>Dalam hal ini bertindak untuk dan atas nama dirinya sendiri sesuai dengan jabatan, yang selanjutnya disebut  sebagai <b><u>Pihak Kedua</u></b> atau <b><u>Yang Menerima</u></b>.</p>

        <p>
          Bahwa untuk menunjang kinerja dari Pihak Kedua, maka dengan ini Pihak Pertama telah menyerahkan fasilitas perusahaan untuk digunakan oleh Pihak Kedua sesuai dengan data dibawah ini, antara Lain :
        </p>

        {/* Daftar Fasilitas */}
        <div>
          <h2 className="font-semibold">1. 1 (satu) Buah Laptop, dengan data spesifikasi sebagai berikut :</h2>
          <div className="grid grid-cols-[160px_10px_1fr] gap-2">
            <div><li>Brand</li></div><div>:</div><div>{assignments.asset.brand}</div>
            <div><li>Type</li></div><div>:</div><div>{assignments.asset.model}</div>
            <div><li>Serial Number</li></div><div>:</div><div>{assignments.asset.serial_number}</div>
            <div><li>Processor</li></div><div>:</div><div>{assignments.asset.processor}</div>
            <div><li>Storage</li></div><div>:</div><div>{assignments.asset.storage}</div>
            <div><li>RAM</li></div><div>:</div><div>{assignments.asset.ram}</div>
            <div><li>Ukuran Layar</li></div><div>:</div><div>{assignments.asset.ukuran_layar}</div>
            <div><li>Sistem Operasi</li></div><div>:</div><div>{assignments.asset.os}</div>
            <div><li>Office</li></div><div>:</div><div>{assignments.asset.office}</div>
          </div>
        </div>

        {/* Software */}
        <div>
          <h2 className="font-semibold">2. Software Terinstall, antara lain :</h2>
          <ul className="list-disc ml-6">
            <li>{assignments.asset.software}</li>
            {/* <li>Google Chrome</li>
            <li>Anydesk</li>
            <li>Microsoft Edge</li>
            <li>Office 365 Business</li>
            <li>Tight VNC</li> */}
          </ul>
        </div>

        {/* Kelengkapan Tambahan */}
        <div>
          <h2 className="font-semibold">3. Kelengkapan tambahan, antara lain :</h2>
          <ul className="list-disc ml-6">
            <li>{assignments.asset.accessories}</li>
            {/* <li>Tas</li> */}
          </ul>
        </div>

        <p>
          Fasilitas tersebut diserahkan oleh Pihak Pertama kepada Pihak Kedua berkaitan dengan jabatannya sebagai <b>{assignments.received_by.position} </b>
          dengan dilakukannya serah terima ini maka berlaku beberapa hal yang harus diperhatikan, antara lain:
        </p>

        {/* Pernyataan */}
        <div className="space-y-3">
          <p>1. Bahwa Fasilitas perusahaan yang diterima oleh Pihak Kedua tidak diperbolehkan untuk dipindah tangankan dan atau dilakukan pengalihan fasilitas kepada orang lain selain dan tanpa adanya persetujuan atasan dan Persetujuan Pihak Pertama.</p>
          <p>2. Bahwa Pihak Kedua bertanggung jawab secara penuh atas segala resiko yang terjadi dikarenakan timbulnya kerusakan dan atau kehilangan yang diakibatkan dari kelalaian Pihak Kedua yang dilakukan secara sengaja dan atau tidak sengaja selama penggunaan fasilitas tersebut. serta Pihak Kedua berkewajiban menanggung segala kerusakan secara pribadi seusai adanya pengecekan dari Pihak Pertama.</p>
          <p>3. Bahwa Pihak Kedua bersedia dalam berjalannya waktu penggunaan fasilitas perusahaan tersebut, untuk dapat diperiksa dan atau dilakukannya audit terkait dengan isi dan dokumen yang ada dalam fasilitas tersebut.</p>
          <p>4. Bahwa Pihak Kedua bertanggung Jawab secara penuh atas data, isi, konten dan dokumen yang berada didalam fasilitas perusahaan tersebut. Serta Pihak Kedua dilarang keras untuk menggunakan fasilitas perusahaan tersebut diluar kepentingan dan tujuan perusahaan yang dilakukan di dalam jam kerja maupun diluar jam kerja.</p>
          <p>5. Apabila Pihak Kedua sudah tidak bekerja kembali dan atau mengundurkan diri. maka Pihak Kedua berkewajiban mengembalikan fasiltas perusahaan tersebut dalam keadaan baik sebagaimana mestinya.</p>
        </div>
        <p>
          Demikian serah terima fasilitas perusahaan ini dibuat dan disetujui oleh PARA PIHAK dan menjadi hukum yang dapat dipertanggung jawabkan dikemudian hari.
        </p>
        {/* Tanda Tangan */}
        <div className="grid grid-cols-4 gap-8 text-center mt-10">



          {settingApproval
            .filter((setting) => setting.user_id === assignments.user_id) // filter setting berdasarkan assignment_id
            .map((setting) => {
              // cari approval untuk user_id approver ini
              const approval = approvals?.find(
                (a) => a.user_id === setting.user_id
              );

              console.log("test", approval);

              return (
                <div key={setting.id} className="border p-3 rounded mb-2">
                  {/* <p><strong>Approver:</strong> {setting.user?.name}
                 ({setting.user?.position})
                 </p> */}
                  <p>&nbsp;</p>
                  <p className="font-semibold">{setting.note}, </p>
                  {/* <p><strong>Role:</strong> {setting.name}</p> */}

                  {approval ? (
                    <>
                      {/* <p className="text-green-600 font-semibold">✅ Approved</p> */}
                      {/* <p><strong>Approval Data:</strong> {approval.approval_date}</p> */}
                      {/* <p><strong>Signature:</strong> {setting.user.signature}</p> */}
                      <div className="h-24">
                        <img
                          src={`/storage/${setting.user.signature}`}
                          alt="Signature"
                          className="w-40 h-auto mt-2"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-red-600">Belum di-approve</p>
                  )}
                  <p>{setting.user.name}</p>
                  <p>{setting.name}</p>
                </div>
              );
            })}

          {settingApproval
            .filter((setting) => setting.type != 1) // filter setting berdasarkan assignment_id
            .map((setting) => {
              // cari approval untuk user_id approver ini
              const approval = approvals?.find(
                (a) => a.user_id === setting.user_id
              );

              console.log("test", approval);

              return (
                <div key={setting.id} className="border p-3 rounded mb-2">
                  {/* <p><strong>Approver:</strong> {setting.user?.name}
                 ({setting.user?.position})
                 </p> */}
                  <p>&nbsp;</p>
                  <p className="font-semibold">{setting.note}, </p>
                  {/* <p><strong>Role:</strong> {setting.name}</p> */}

                  {approval ? (
                    <>
                      {/* <p className="text-green-600 font-semibold">✅ Approved</p> */}
                      {/* <p><strong>Approval Data:</strong> {approval.approval_date}</p> */}
                      {/* <p><strong>Signature:</strong> {setting.user.signature}</p> */}
                      <div className="h-24">
                        <img
                          src={`/storage/${setting.user.signature}`}
                          alt="Signature"
                          className="w-40 h-auto mt-2"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-red-600">Belum di-approve</p>
                  )}
                  <p>{setting.user.name}</p>
                  <p>{setting.name}</p>
                </div>
              );
            })}

<div className="border p-3 rounded mb-2">
<p>&nbsp;</p>
<p className="font-semibold">Menyetujui,</p>
{approvals.some((approval) => approval.user_id === assignments.received_by.id) ? (
  approvals
    .filter((approval) => approval.user_id === assignments.received_by.id)
    .map((approval) => (
      <div key={approval.id} className="h-24">
        <img
                          src={`/storage/${approval.signature}`}
                          alt="Signature"
                          className="w-40 h-auto mt-2"
                        />
      </div>
    ))
) : (
   <Button onClick={() => { setIsDialogOpen(true) }}>Approval</Button>
)}
  <p>{assignments.received_by.name}</p>
 <p>Penerima</p>
</div>
          
        </div>
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Assignment Tanda Tangan</AlertDialogTitle>
            <AlertDialogDescription>

            </AlertDialogDescription>
          </AlertDialogHeader>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="flex flex-col items-center gap-4"
          >
            <SignatureCanvas
              penColor="black"
              ref={sigPad}
              canvasProps={{
                width: 400,
                height: 200,
                className: 'border border-gray-300 rounded-md',
              }}
            />
            {/* <InputError message={errors.signature} /> */}



            <div className="flex gap-3">

              <Button variant="destructive" onClick={clearSignature}>Clear</Button>

              <Button type="submit" >
                {/* {processing ? 'Menyimpan...' : 'Submit Approval'} */}
                simpan
              </Button>

              {/* <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  cancel
                </Button> */}
              <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                Cancel
              </AlertDialogCancel>
            </div>
          </form>

          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
            Cancel
          </AlertDialogCancel> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


    </>
  );
}
