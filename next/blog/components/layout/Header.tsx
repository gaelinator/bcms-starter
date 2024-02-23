import NextLink from 'next/link';
import { BCMSImage } from 'next-plugin-bcms/components';
import classNames from 'classnames';
import { ContentManager } from '@/components/ContentManager';
import { HeaderEntryMeta } from '@/bcms/types';
import React, { FC, useState } from 'react';
import MenuIcon from '@/assets/icons/menu.svg';
import XIcon from '@/assets/icons/x.svg';
import { TopGradient } from '@/components/TopGradient';
import NextImage from 'next/image';

interface Props {
  data: HeaderEntryMeta;
}

export const Header: FC<Props> = ({ data }) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  return (
    <header className="relative z-50">
      <div className="relative z-10 container">
        <nav className="relative flex items-center justify-between pt-6">
          <NextLink href="/">
            <a className="flex" aria-label="Home page">
              <BCMSImage
                media={data.logo}
                svg
                className={classNames(
                  'w-[125px] md:w-[165px]',
                  showMobileMenu &&
                    'max-md:grayscale max-md:brightness-0 max-md:invert',
                )}
              />
            </a>
          </NextLink>
          <ul
            className={classNames(
              'flex gap-6 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center lg:gap-10',
              showMobileMenu ? 'flex-col' : 'max-md:hidden',
            )}
          >
            {data.nav.map((item, index) => (
              <li key={index}>
                <ContentManager
                  items={item}
                  className="text-xl leading-none tracking-[-0.41px] max-md:text-white"
                />
              </li>
            ))}
          </ul>
          <button
            className="flex md:hidden"
            aria-label="Toggle mobile menu"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <NextImage
                src={XIcon}
                className={`w-6 h-6 ${
                  showMobileMenu
                    ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                    : ''
                }`}
              />
            ) : (
              <NextImage src={MenuIcon} className="w-6 h-6" />
            )}
          </button>
        </nav>
      </div>
      {showMobileMenu && (
        <div>
          <div className="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden" />
          <TopGradient className="md:hidden" />
        </div>
      )}
    </header>
  );
};
