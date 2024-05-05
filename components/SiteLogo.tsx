import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SiteLogo = ({linkClassName, imageClassName, imageWidth=34, imageHeight=34, labelClassName}: SiteLogoProps) => {
  return (
    <Link
    href="/"
    className={linkClassName}
  >
    <Image
      src="/icons/logo.svg"
      width={imageWidth}
      height={imageHeight}
      alt="Horizon Logo"
      className={imageClassName}
    />
    <h1 className={labelClassName}>
      Horizon
    </h1>
  </Link>
  )
}

export default SiteLogo