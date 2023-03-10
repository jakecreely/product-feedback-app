import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {

  return (
    <>
      <Head>
        <title>Product Feedback</title>
        <meta name="description" content="Product Feedback App from Front-end Mentor" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}
