import { Heading, IHeadingProps, ILinkProps, IParagraphProps, Link, Paragraph } from '@shared/ui/Text';

// Text.tsx
export const Text = {
    Paragraph: ({ color, fontFamily, weight, size, className, children }: IParagraphProps) => (
        <Paragraph
            fontFamily={fontFamily}
            weight={weight}
            color={color}
            size={size}
            className={className}
        >
            {children}
        </Paragraph>
    ),
    Heading: ({ color, fontFamily, weight, size, className, children }: IHeadingProps) => (
        <Heading
            fontFamily={fontFamily}
            weight={weight}
            color={color}
            size={size}
            className={className}
        >
            {children}
        </Heading>
    ),
    Link: ({ color, to, fontFamily, weight, size, className, children }: ILinkProps) => (
        <Link
            to={to}
            fontFamily={fontFamily}
            weight={weight}
            color={color}
            size={size}
            className={className}
        >
            {children}
        </Link>
    ),
};
