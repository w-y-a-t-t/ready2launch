"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GradeBadge } from "./GradeBadge";
import { BiPlusCircle } from "react-icons/bi";
import Header from "../components/Header";
import { MdOutlineImage } from "react-icons/md";
import { IoPersonCircleOutline, IoSearchSharp } from "react-icons/io5";
import { LuPencil } from "react-icons/lu";
import { FaRegHeart, FaRegKeyboard } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { GiAlliedStar } from "react-icons/gi";
import SocialLink from "../components/SocialLink";
import Link from "next/link";
import { reportData } from "./reportData";

type IconType = typeof MdOutlineImage;

const iconMap: Record<string, IconType> = {
  MdOutlineImage,
  IoPersonCircleOutline,
  LuPencil,
  FaRegHeart,
  IoMdCheckmark,
  GiAlliedStar,
  FaRegKeyboard,
  IoSearchSharp,
};

interface SectionProps {
  icon: keyof typeof iconMap;
  title: string;
  grade: string;
  content: {
    list?: string[];
    paragraphs?: string[];
  };
}

const Section: React.FC<SectionProps> = ({ icon, title, grade, content }) => {
  const Icon = iconMap[icon];
  return (
    <div className="bg-white text-white rounded-[10px] overflow-hidden">
      <div className="flex justify-between items-center md:px-[18px] px-4 py-[7px] bg-[#5E656C]">
        <div className="flex items-center lg:gap-[16px] md:gap-[14px] gap-2">
          <Icon
            size={24}
            className="lg:min-w-[24px] lg:w-[24px] w-[20px] min-w-[20px]"
          />
          <h2 className="font-[400] lg:text-[21px] md:text-[20px] text-[18px]">
            {title}
          </h2>
        </div>
        <GradeBadge grade={grade} />
      </div>
      <div
        className={`md:px-[18px] px-4 py-[14px] ${title !== "Visual Appeal" && title !== "Usability"
            ? "blur-sm select-none"
            : ""
          }`}
      >
        {content.list && (
          <ul className="list-disc md:ml-6 ml-5 mb-4 text-[#252A2E] md:text-[16px] text-[14px]">
            {content.list.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
        {content.paragraphs &&
          content.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[#252A2E] md:text-[16px] text-[14px]"
            >
              {paragraph}
            </p>
          ))}
      </div>
    </div>
  );
};

function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): T {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  } as T;
}

export default function ReportPage() {
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const originalTopRef = useRef<number | null>(null);

  const handleScroll = useCallback(
    throttle(() => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const isWindowWide = window.innerWidth >= 1024;

      if (isWindowWide) {
        setIsSticky(false);
        return;
      }

      if (originalTopRef.current === null) {
        originalTopRef.current = rect.top + scrollY;
      }

      if (scrollY > originalTopRef.current) {
        if (!isSticky) setIsSticky(true);
      } else {
        if (isSticky) setIsSticky(false);
      }
    }, 100),
    [isSticky]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const sections = reportData.sections;
  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-[#252A2E] text-white relative">
      <Header />
      <main className="px-4 lg:px-[24px] 3xl:py-[47px] py-[23px] w-full relative z-[0]">
        <div className="3xl:max-w-[1600px] 2xl:max-w-[1280px] max-w-[1280px] mx-auto">
          {/* Header Card */}
          <div className="bg-white text-[#252A2E] rounded-[20px] xl:px-[48px] lg:px-[42px] md:px-[30px] sm:px-[20px] px-4 xl:py-[42px] lg:py-[38px] md:py-[30px] py-[20px] xl:mb-[62px] lg:mb-[50px] md:mb-[40px] mb-[30px] flex justify-between items-center gap-2 md:flex-nowrap flex-wrap">
            <div>
              <h1 className="2xl:text-[50px] xl:text-[45px] lg:text-[35px] md:text-[25px] text-[21px] font-bold">
                Your Custom Report
              </h1>
              <Link
                href={reportData.websiteUrl}
                target="_blank"
                className="font-[300] 2xl:text-[30px] xl:text-[25px] lg:text-[20px] md:text-[18px] text-base md:mt-1"
              >
                {reportData.websiteUrl}
              </Link>
            </div>
            <div className="flex items-center md:gap-2 gap-[6px]">
              <Image
                src="/assets/box.svg"
                alt="box"
                width={52.05}
                height={59.8}
                className="2xl:w-[52.05px] lg:w-[40px] md:w-[30px] w-[24px] 2xl:h-[59.8px] lg:h-[40px] md:h-[30px] h-[24px]"
              />
              <span className="font-[600] 2xl:text-[35px] xl:text-[30px] lg:text-[25px] md:text-[20px] text-base">
                {reportData.companyName}
              </span>
            </div>
          </div>

          <div className="relative grid lg:grid-cols-[300px,1fr] h-full lg:gap-8 gap-[100px]">
            {/* Left Sidebar */}
            <div className="h-full relative z-[2]">
              <div className="sticky top-1 left-0 h-max lg:pb-[160px]">
                <div className="relative">
                  <div className="rounded-[10px] overflow-hidden relative">
                    <Image
                      src="/assets/laptop.png"
                      alt="Website Screenshot"
                      width={545}
                      height={337}
                      className="w-full rounded-[10px] overflow-hidden"
                    />
                    {/* <h3 className="w-full h-full flex items-center justify-center absolute top-0 text-center font-sans">
                      Your website <br /> screenshot
                    </h3> */}
                    <div className="overflow-hidden w-[73.5%] sm:w-[73%] lg:h-[73%] md:h-[73%] h-[73%] absolute top-[7.3vw] lg:top-[1.42rem] left-[12.2vw] sm:left-[13vw] md:left-[13vw] lg:left-[41px]">
                      <img
                        src={reportData.webScreenshot}
                        alt="website screenshot"
                        className="overflow-hidden h-full object-cover w-full"
                      />
                    </div>
                  </div>
                  <div className="absolute lg:top-[-2%] top-[2%] lg:right-[3%] right-[7%]">
                    <GradeBadge
                      grade={reportData.overallGrade}
                      className="md:w-[70px] sm:w-[55px] w-[48px] md:h-[70px]  sm:h-[55px] h-[48px] sm:border-[4.5px] border-[4px] 2xl:text-[30px] xl:text-[30px] lg:text-[20px] md:text-[18px] text-[16px]"
                    />
                  </div>
                </div>

                <div
                  ref={sectionRef}
                  className={`bg-[#252A2E] z-40 py-4 flex flex-col 2xl:gap-[40px] xl:gap-[35px] lg:gap-[30px] md:gap-[25px] gap-[20px] xl:mt-[30px] lg:mt-[25px]
                  ${isSticky
                      ? "fixed top-0 left-0 right-0 px-4"
                      : "relative md:mt-[20px] mt-[15px]"
                    }`}
                >
                  <h2 className="lg:text-[23px] md:text-[20px] text-[18px] font-bold">
                    Get your full detailed PDF report by email today!
                  </h2>
                  <Link
                    href="/checkout"
                    className="relative w-full text-center bg-cyan text-white lg:py-[12px] md:py-[10px] py-[9px] px-6 rounded-[10px] overflow-hidden xl:text-[24px] lg:text-[22px] md:text-[20px] text-[18px] font-bold 
                   transition-all duration-300 ease-in-out shadow-lg animate-shadowPulse hover:bg-emerald-500"
                  >
                    <span className="relative z-10">
                      Unlock ({reportData.pdfPrice})
                    </span>

                    {/* Glowing Background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-75 blur-lg animate-pulse"></span>
                  </Link>
                </div>

                <div className="relative mx-auto 3xl:w-[361px] lg:w-[240px] w-[220px] 3xl:h-[358.4px] 2xl:mt-[40px] xl:mt-[40px] lg:mt-[30px] md:mt-[30px] mt-[20px]">
                  {/* First page - back */}
                  <div className="absolute right-0 top-8 3xl:w-[361px] lg:w-[240px] w-[220px] 3xl:h-[190px] xl:h-[180px] lg:h-[170px] h-auto mt-[20px]">
                    <Image
                      src="/assets/page3.png"
                      alt="Website Review Page 3"
                      width={167}
                      height={216.12}
                      priority
                      className="shadow-lg ms-auto object-contain"
                    />
                  </div>

                  {/* Second page - middle */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 3xl:w-[361px] lg:w-[240px] w-[220px] 3xl:h-[190px] xl:h-[180px] lg:h-[170px] h-auto mt-[20px]">
                    <Image
                      src="/assets/page2.png"
                      alt="Website Review Page 2"
                      width={167}
                      height={216.12}
                      priority
                      className="shadow-lg mx-auto object-contain"
                    />
                  </div>

                  {/* Third page - front */}
                  <div className="relative left-0 3xl:w-[361px] lg:w-[240px] w-[220px] 3xl:h-[190px] xl:h-[180px] lg:h-[170px] h-auto mt-[20px]">
                    <Image
                      src="/assets/page1.png"
                      alt="Website Review Page 1"
                      width={167}
                      height={216.12}
                      priority
                      className="shadow-lg relative left-0 object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="lg:block hidden absolute -bottom-10 left-0">
                <SocialLink />
                <div className="my-5 flex items-center gap-3">
                  <Link href='/terms-and-service' className="text-nowrap text-white lg:text-[20px] md:text-[18px] text-base hover:text-cyan transition-all duration-300">Terms of Service</Link>
                  <Link href='/privacy-policy' className="text-nowrap text-white lg:text-[20px] md:text-[18px] text-base hover:text-cyan transition-all duration-300">Privacy Policy</Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 relative z-[1]">
              {/* Summary Section */}
              <div className="bg-white text-white rounded-[10px] overflow-hidden">
                <div className="flex justify-between items-center md:px-[18px] px-4 py-[7px] bg-[#5E656C]">
                  <div className="flex items-center lg:gap-[16px] md:gap-[14px] gap-2">
                    <span>
                      <BiPlusCircle
                        size={24}
                        className="lg:min-w-[24px] lg:w-[24px] w-[20px] min-w-[20px]"
                      />
                    </span>

                    <h2 className="font-[400] lg:text-[21px] md:text-[20px] text-[18px]">
                      Summary
                    </h2>
                  </div>
                  <GradeBadge grade={reportData.summary.grade} />
                </div>
                <div className="md:px-[18px] px-4 py-[14px]">
                  <ul className="list-disc md:ml-6 ml-5 mb-4 text-[#252A2E] md:text-[16px] text-[14px]">
                    {reportData.summary.list.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[#252A2E] md:text-[16px] text-[14px]">
                    {reportData.summary.content}
                  </p>
                </div>
              </div>

              {/* Visual Appeal Section */}
              <div className="grid md:grid-cols-2 gap-6">
                {sections.map((section, index) => (
                  <Section key={index} {...section} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 lg:hidden mt-10">
            <SocialLink />
            <Link href='/terms-and-service' className="text-nowrap text-white lg:text-[20px] md:text-[18px] text-base hover:text-cyan transition-all duration-300">Terms of Service</Link>
            <Link href='/privacy-policy' className="text-nowrap text-white lg:text-[20px] md:text-[18px] text-base hover:text-cyan transition-all duration-300">Privacy Policy</Link>

          </div>
        </div>
      </main>
    </div>
  );
}
