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
    console.log(asset);
    const breadcrumbs = [
        {
            title: 'Asset / Show',
            href: '/asset/show',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Asset Detail" />
            <div className="container mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                        <Card className='border-0 shadow-none'>
                            <CardContent className='p-0'>
                                <img
                                    src={asset.image}
                                    alt={asset.image}
                                    className='rounded-lg object-cover aspect-square' />
                            </CardContent>
                        </Card>
                        {/* <Card className='border-0 shadow-none'>
                        <CardContent className='p-0'>
                        <QRCodeCanvas value={url} size={200} includeMargin={true} />
                        </CardContent>
                    </Card> */}
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
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {asset.name}
                            </h1>
                            <div className="flex justify-betwent gap-2">
                                <p className="text-2xl font-semibolde mt-2">
                                    <span>Harga</span>
                                    <p>
                                        {asset.purchase_price?.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </p>
                                </p>
                                <p className="text-2xl font-semibolde mt-2">
                                    <span>Harga Jual</span>
                                    <p>
                                        {asset.current_value?.toLocaleString('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR',
                                        })}
                                    </p>
                                </p>
                            </div>
                            <div className="flex item-center gap-2 mt">
                                <span className="text-sm text-muted-foreground">
                                    Status :
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    {asset.status}
                                </span>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">
                                Deskripsi
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {asset.notes}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}