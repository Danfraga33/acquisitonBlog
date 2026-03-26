import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";

const MenuButton = ({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`cursor-pointer rounded px-2 py-1 text-xs transition-colors ${
      active
        ? "bg-primary text-primary-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-foreground"
    }`}
  >
    {children}
  </button>
);

export function RichEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none min-h-[300px] p-4 focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!mounted || !editor) return null;

  const setLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className="border-border rounded-lg border">
      <div className="border-border flex flex-wrap gap-1 border-b p-2">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          Bold
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          Italic
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          H2
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          active={editor.isActive("heading", { level: 3 })}
        >
          H3
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          List
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          Numbered
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          Quote
        </MenuButton>
        <MenuButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          Code
        </MenuButton>
        <MenuButton onClick={setLink} active={editor.isActive("link")}>
          Link
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          HR
        </MenuButton>
        <div className="bg-border mx-1 w-px self-stretch" />
        <MenuButton onClick={insertTable} active={editor.isActive("table")}>
          Table
        </MenuButton>
        {editor.isActive("table") && (
          <>
            <MenuButton onClick={() => editor.chain().focus().addColumnBefore().run()}>
              +Col←
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()}>
              +Col→
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteColumn().run()}>
              -Col
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addRowBefore().run()}>
              +Row↑
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()}>
              +Row↓
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteRow().run()}>
              -Row
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteTable().run()}>
              Del Table
            </MenuButton>
          </>
        )}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
