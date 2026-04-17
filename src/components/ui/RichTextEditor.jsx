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
      className={`p-1 text-sm hover:text-indigo-400 transition-colors ${
        active ? 'text-indigo-400' : 'text-gray-600'
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-4 bg-gray-200 mx-1" />
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
        class: 'prose prose-sm max-w-none p-4 min-h-48 outline-none leading-relaxed text-gray-900',
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
    <div className="w-full flex-1 flex flex-col min-h-0 border border-gray-200 focus-within:border-indigo-400">
      <div className="flex flex-wrap items-center g: gap-0 border-b border-gray-200 p-3 bg-gray-50">
        <ToolbarButton onClick={() => e.chain().focus().undo().run()} title="Undo"><Undo size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().redo().run()} title="Redo"><Redo size={16} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 1 }).run()} active={e.isActive('heading', { level: 1 })} title="Heading 1"><Heading1 size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 2 }).run()} active={e.isActive('heading', { level: 2 })} title="Heading 2"><Heading2 size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHeading({ level: 3 }).run()} active={e.isActive('heading', { level: 3 })} title="Heading 3"><Heading3 size={16} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleBold().run()} active={e.isActive('bold')} title="Bold"><Bold size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleItalic().run()} active={e.isActive('italic')} title="Italic"><Italic size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleUnderline().run()} active={e.isActive('underline')} title="Underline"><UnderlineIcon size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleStrike().run()} active={e.isActive('strike')} title="Strikethrough"><Strikethrough size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleHighlight().run()} active={e.isActive('highlight')} title="Highlight"><Highlighter size={16} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().toggleBulletList().run()} active={e.isActive('bulletList')} title="Bullet List"><List size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleOrderedList().run()} active={e.isActive('orderedList')} title="Ordered List"><ListOrdered size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().toggleBlockquote().run()} active={e.isActive('blockquote')} title="Blockquote"><Quote size={16} /></ToolbarButton>
        <Divider />
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('left').run()} active={e.isActive({ textAlign: 'left' })} title="Align Left"><AlignLeft size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('center').run()} active={e.isActive({ textAlign: 'center' })} title="Align Center"><AlignCenter size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('right').run()} active={e.isActive({ textAlign: 'right' })} title="Align Right"><AlignRight size={16} /></ToolbarButton>
        <ToolbarButton onClick={() => e.chain().focus().setTextAlign('justify').run()} active={e.isActive({ textAlign: 'justify' })} title="Justify"><AlignJustify size={16} /></ToolbarButton>
      </div>

      <div className="flex-1 overflow-y-auto bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}