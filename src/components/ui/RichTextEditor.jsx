import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { useEffect } from 'react'

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered, Heading1, Heading2, Heading3,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Highlighter, Undo, Redo, Quote
} from 'lucide-react'

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded text-sm hover:bg-gray-100 transition-colors ${active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700'}`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-300 mx-1" />
}

export function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-3 min-h-48 outline-none pprose-sse-sm leading-tight',
      },
    },
  })

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) return null

  const e = editor

  return (
    <div className="w-full flex-1 flex flex-col min-h-0 rounded-lg border-2 border-solid focus-within:border-indigo-500">
      <div className="flex flex-wrap items-center gap-0.5 border-b p-2">
        <ToolbarButton onClick={() => e.chain().focus().undo().run()} title="Undo"><Undo size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().redo().run()} title="Redo"><Redo size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 1 }).run()} active={e.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()} active={e.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()} active={e.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleBold().run()} active={e.isActive('bold')} title="Bold"><Bold size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleItalic().run()} active={e.isActive('italic')} title="Italic"><Italic size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleUnderline().run()} active={e.isActive('underline')} title="Underline"><UnderlineIcon size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleStrike().run()} active={e.isActive('strike')} title="Strikethrough"><Strikethrough size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHighlight().run()} active={e.isActive('highlight')} title="Highlight"><Highlighter size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleBulletList().run()} active={e.isActive('bulletList')} title="Bullet List"><List size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleOrderedList().run()} active={e.isActive('orderedList')} title="Ordered List"><ListOrdered size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleBlockquote().run()} active={e.isActive('blockquote')} title="Blockquote"><Quote size={15} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('left').run()} active={e.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('center').run()} active={e.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('right').run()} active={e.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={15} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('justify').run()} active={e.isActive({ textAlign: 'justify' })} title="Justify"><AlignJustify size={15} /></ToolbarButton>
      </div>

      <div className="flex-1 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}