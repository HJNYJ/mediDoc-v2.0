import { useEffect, useState } from "react";

interface useIntersectionObserverProps {
  root?: null;
  rootMargin?: string;
  threshold?: number;
  onIntersect: IntersectionObserverCallback;
}

const useInterSectionObserver = ({
  root,
  rootMargin,
  threshold,
  onIntersect
}: useIntersectionObserverProps) => {
  const [target, setTarget] = useState<HTMLElement | null | undefined>(null);
  // const observer = useRef<IntersectionObserver | null>(null);

  //observer 등록
  //target이라는 상태값이 있으면 IntersectionObserver를 생성하여 observer에 담음
  useEffect(() => {
    if (!target) return;
    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold
    });
    //observer 관찰 시작
    observer.observe(target);

    //observer 관찰 종료
    return () => observer.unobserve(target);
  }, [target, onIntersect, root, rootMargin, threshold]);

  return { setTarget };
};

export default useInterSectionObserver;
