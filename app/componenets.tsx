import { colorMap } from "@/app/mapping";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Link from "next/link";

import {
  CodeBlockObjectResponse,
  TextRichTextItemResponse,
  Heading3BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading1BlockObjectResponse,
  ParagraphBlockObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  LastEditedTimePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const RichText: React.FC<{ item: TextRichTextItemResponse }> = ({
  item,
}) => {
  const { annotations, text } = item;
  const className = [
    annotations.bold ? "font-bold" : "",
    annotations.italic ? "italic" : "",
    annotations.strikethrough ? "line-through" : "",
    annotations.underline ? "underline" : "",
    annotations.code ? "font-mono bg-gray-100 rounded px-1" : "",
    colorMap[annotations.color] || colorMap.default,
  ].join(" ");
  const content = <span className={className}>{text.content}</span>;
  return text.link ? <Link href={text.link.url}>{content}</Link> : content;
};

export function Heading1({ heading_1 }: Heading1BlockObjectResponse) {
  const { rich_text, color } = heading_1;
  const headingClassName = `text-2xl font-semibold ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h1 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h1>
  );
}

export function Heading2({ heading_2 }: Heading2BlockObjectResponse) {
  const { rich_text, color } = heading_2;
  const headingClassName = `text-xl font-semibold ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h2 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h2>
  );
}

export function Heading3({ heading_3 }: Heading3BlockObjectResponse) {
  const { rich_text, color } = heading_3;
  const headingClassName = `text-l font-semibold ${
    colorMap[color] || colorMap.default
  }`;
  return (
    <h3 className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </h3>
  );
}

export function Paragraph({ paragraph }: ParagraphBlockObjectResponse) {
  const { rich_text, color } = paragraph;
  const headingClassName = `text-normal ${colorMap[color] || colorMap.default}`;
  return (
    <p className={headingClassName}>
      {rich_text
        .filter(
          (item): item is TextRichTextItemResponse => item.type === "text"
        )
        .map((item, index) => (
          <RichText key={index} item={item} />
        ))}
    </p>
  );
}

export function Code({ code }: CodeBlockObjectResponse) {
  const { rich_text, language } = code;
  const codeContent = rich_text
    .filter((item): item is TextRichTextItemResponse => item.type === "text")
    .map((item) => item.text.content)
    .join("\n");
  return (
    <SyntaxHighlighter language={language} style={atomOneLight}>
      {codeContent}
    </SyntaxHighlighter>
  );
}

export const NotionTags: React.FC<{
  tags: MultiSelectPropertyItemObjectResponse;
}> = ({ tags }) => (
  <div className="flex flex-wrap gap-2 mb-4">
    <span>Tags:</span>
    {tags.multi_select.map((tag) => (
      <span key={tag.id} className={`py-1 rounded-full p-4 text-sm border`}>
        {tag.name}
      </span>
    ))}
  </div>
);

export const NotionPageTitle: React.FC<{ title: TextRichTextItemResponse }> = ({
  title,
}) => (
  <h1 className="text-3xl font-bold no-line-height tight-letters mb-8">
    <RichText item={title} />
  </h1>
);

export const LastUpdated: React.FC<{
  updated: LastEditedTimePropertyItemObjectResponse;
}> = ({ updated }) => (
  <span className="text-sm text-gray-500">
    Last updated: {new Date(updated.last_edited_time).toLocaleDateString()}
  </span>
);

export const PageDescription: React.FC<{
  description: TextRichTextItemResponse[];
}> = ({ description }) => (
  <p className=" text-base mt-1">
    {description.map((item, index) => (
      <RichText key={index} item={item} />
    ))}
  </p>
);
