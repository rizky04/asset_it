import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Asset } from '@/types'
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import { QRCodeCanvas } from "qrcode.react";


interface DetailAssetProps {
    asset: Asset
    url: string
}
export default function show({ asset, url }: DetailAssetProps) {

  return (

    <div className="container mx-auto px-4 py-10">
    <div className="grid gap-10 md:grid-cols-2 items-start">
      {/* Media + QR mini */}
      <div className="space-y-6">
        <Card className="overflow-hidden rounded-2xl shadow-sm">
          <CardContent className="p-0">
            {asset.image ? (
              <img
                src={asset.image}
                alt={asset.name}
                className="aspect-square w-full object-cover"
              />
            ) : (
              <div className="aspect-square w-full grid place-items-center bg-slate-100">
                <span className="text-slate-400 text-sm">No Image</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardContent className="flex items-center gap-4 p-4">
            <QRCodeCanvas value={url} size={140} includeMargin />
            <div className="space-y-1">
              <p className="text-sm text-slate-500">
                Scan untuk membuka halaman detail
              </p>
              <Link
                href={route('assets.qr', asset.assets_code)}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Buka Halaman QR (tanpa sidebar)
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detail */}
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{asset.name}</h1>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Harga Beli
              </p>
              <p className="text-lg font-semibold">
                {asset.purchase_price?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }) ?? "-"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Harga Jual / Nilai Saat Ini
              </p>
              <p className="text-lg font-semibold">
                {asset.current_value?.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }) ?? "-"}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="text-slate-500">Status:</span>
            <span className="font-medium">{asset.status ?? "-"}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <h2 className="text-xl font-semibold">Deskripsi</h2>
          <p className="text-slate-600 leading-relaxed">
            {asset.notes ?? "-"}
          </p>
        </div>
      </div>
    </div>
  </div>

  )
}