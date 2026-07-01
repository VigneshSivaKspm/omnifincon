import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  Save, Globe, ArrowLeft, Upload, X, Eye, Edit3, Bold, Italic,
  Underline, List, ListOrdered, Quote, Link as LinkIcon, Heading1, Heading2, Image, Film, Minus, Tag,
} from "lucide-react";
import {
  createPost, updatePost, getPostById, uploadCoverImage, uploadCoverVideo, slugify, BlogPost,
} from "../../../lib/blogService";
import { Timestamp } from "firebase/firestore";
import { G, GOLD, BLUE, TEXT1, TEXT2, TEXT3, FONT_SANS, FONT_SERIF, SURF_BORDER } from "../../../lib/tokens";

const CATEGORIES = [
  "Investment Banking", "Wealth Management", "Real Estate",
  "Retail Credit", "Regulatory", "Market Outlook", "MSME & SME", "General",
];

type EditorMode = "write" | "preview";

function insertAroundSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  onChange: (v: string) => void,
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = textarea.value.substring(start, end);
  const newVal =
    textarea.value.substring(0, start) +
    before +
    (selected || "text") +
    after +
    textarea.value.substring(end);
  onChange(newVal);
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + before.length, start + before.length + (selected || "text").length);
  }, 0);
}

function insertAtLineStart(
  textarea: HTMLTextAreaElement,
  prefix: string,
  onChange: (v: string) => void,
) {
  const start = textarea.selectionStart;
  const lineStart = textarea.value.lastIndexOf("\n", start - 1) + 1;
  const newVal =
    textarea.value.substring(0, lineStart) +
    prefix +
    textarea.value.substring(lineStart);
  onChange(newVal);
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
  }, 0);
}

function ToolbarBtn({ icon: Icon, label, onClick }: { icon: any; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      style={{
        width: 32, height: 32, borderRadius: 6, border: `1px solid ${SURF_BORDER}`,
        background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
        justifyContent: "center", transition: "all 0.15s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = `${G}10`;
        (e.currentTarget as HTMLButtonElement).style.borderColor = `${G}35`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = "#fff";
        (e.currentTarget as HTMLButtonElement).style.borderColor = SURF_BORDER;
      }}
    >
      <Icon size={14} color={TEXT2} />
    </button>
  );
}

export default function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === "new";

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<EditorMode>("write");
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [coverMediaType, setCoverMediaType] = useState<"image" | "video">("image");

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManual, setSlugManual] = useState(false);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState(5);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  useEffect(() => {
    if (isNew) return;
    getPostById(id!).then(post => {
      if (!post) { navigate("/admin/posts"); return; }
      setTitle(post.title);
      setSlug(post.slug);
      setSlugManual(true);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCategory(post.category);
      setAuthor(post.author);
      setReadTime(post.readTime);
      setTags(post.tags ?? []);
      setCoverImageUrl(post.coverImageUrl ?? "");
      setCoverMediaType(post.coverMediaType ?? "image");
      setStatus(post.status);
      setLoading(false);
    });
  }, [id]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) setSlug(slugify(title));
  }, [title, slugManual]);

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (coverMediaType === "image") {
      if (!file.type.startsWith("image/")) { showToast("Please select an image file.", "error"); return; }
      if (file.size > 5 * 1024 * 1024) { showToast("Image must be under 5 MB.", "error"); return; }
      setUploadingCover(true);
      try {
        const url = await uploadCoverImage(file);
        setCoverImageUrl(url);
        showToast("Cover image uploaded.");
      } catch {
        showToast("Upload failed. Check Firebase Storage rules.", "error");
      } finally {
        setUploadingCover(false);
        if (coverInputRef.current) coverInputRef.current.value = "";
      }
    } else {
      if (!file.type.startsWith("video/")) { showToast("Please select a video file.", "error"); return; }
      if (file.size > 200 * 1024 * 1024) { showToast("Video must be under 200 MB.", "error"); return; }
      setUploadingCover(true);
      setUploadProgress(0);
      try {
        const url = await uploadCoverVideo(file, pct => setUploadProgress(Math.round(pct)));
        setCoverImageUrl(url);
        showToast("Cover video uploaded.");
      } catch {
        showToast("Upload failed. Check Firebase Storage rules.", "error");
      } finally {
        setUploadingCover(false);
        setUploadProgress(0);
        if (coverInputRef.current) coverInputRef.current.value = "";
      }
    }
  }

  function addTag() {
    const t = tagInput.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t) && tags.length < 8) {
      setTags(prev => [...prev, t]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    setTags(prev => prev.filter(t => t !== tag));
  }

  async function save(targetStatus: "draft" | "published") {
    if (!title.trim()) { showToast("Title is required.", "error"); return; }
    if (!slug.trim()) { showToast("Slug is required.", "error"); return; }
    if (!content.trim()) { showToast("Content cannot be empty.", "error"); return; }
    if (!author.trim()) { showToast("Author name is required.", "error"); return; }

    setSaving(true);
    try {
      const payload: Omit<BlogPost, "id" | "createdAt" | "updatedAt" | "views"> = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim(),
        content: content.trim(),
        coverImageUrl,
        coverMediaType,
        category,
        author: author.trim(),
        readTime,
        tags,
        status: targetStatus,
        publishedAt: targetStatus === "published" ? Timestamp.now() : null,
      };

      if (isNew) {
        const newId = await createPost(payload);
        showToast(targetStatus === "published" ? "Post published!" : "Draft saved.");
        navigate(`/admin/posts/${newId}/edit`, { replace: true });
      } else {
        await updatePost(id!, payload);
        setStatus(targetStatus);
        showToast(targetStatus === "published" ? "Post published!" : "Draft saved.");
      }
    } catch (err) {
      showToast("Save failed. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  }

  // Editor toolbar actions
  const tb = textareaRef.current;
  const toolbar = [
    { icon: Bold,        label: "Bold",           action: () => tb && insertAroundSelection(tb, "<strong>", "</strong>", setContent) },
    { icon: Italic,      label: "Italic",          action: () => tb && insertAroundSelection(tb, "<em>", "</em>", setContent) },
    { icon: Underline,   label: "Underline",       action: () => tb && insertAroundSelection(tb, "<u>", "</u>", setContent) },
    { icon: Heading1,    label: "Heading 1",       action: () => tb && insertAtLineStart(tb, "<h2>", setContent) },
    { icon: Heading2,    label: "Heading 2",       action: () => tb && insertAtLineStart(tb, "<h3>", setContent) },
    { icon: List,        label: "Bullet list",     action: () => tb && insertAtLineStart(tb, "<li>", setContent) },
    { icon: ListOrdered, label: "Numbered list",   action: () => tb && insertAtLineStart(tb, "<li>", setContent) },
    { icon: Quote,       label: "Blockquote",      action: () => tb && insertAroundSelection(tb, "<blockquote>", "</blockquote>", setContent) },
    { icon: LinkIcon,    label: "Link",            action: () => { const url = prompt("Enter URL:"); if (url) tb && insertAroundSelection(tb, `<a href="${url}">`, "</a>", setContent); } },
    { icon: Image,       label: "Image URL",       action: () => { const url = prompt("Enter image URL:"); if (url) { setContent(c => c + `\n<img src="${url}" alt="image" />\n`); } } },
    { icon: Minus,       label: "Divider",         action: () => setContent(c => c + "\n<hr />\n") },
  ];

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    border: `1px solid ${SURF_BORDER}`, borderRadius: 10,
    fontFamily: FONT_SANS, fontSize: "0.9rem", color: TEXT1,
    background: "#F4F7FD", outline: "none",
  };

  const labelStyle = {
    display: "block", fontFamily: FONT_SANS, fontSize: "0.72rem",
    fontWeight: 600, color: TEXT2, marginBottom: 6,
    textTransform: "uppercase" as const, letterSpacing: "0.08em",
  };

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `3px solid ${G}30`, borderTopColor: G, animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1200 }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          padding: "12px 20px", borderRadius: 10,
          background: toast.type === "success" ? G : "#DC2626",
          color: "#fff", fontFamily: FONT_SANS, fontSize: "0.84rem", fontWeight: 600,
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          animation: "slideIn 0.3s ease",
        }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => navigate("/admin/posts")}
            style={{ width: 36, height: 36, borderRadius: 8, border: `1px solid ${SURF_BORDER}`, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <ArrowLeft size={15} color={TEXT2} />
          </button>
          <div>
            <h1 style={{ fontFamily: FONT_SERIF, fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, color: TEXT1 }}>
              {isNew ? "New Post" : "Edit Post"}
            </h1>
            {!isNew && (
              <span style={{ fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT3 }}>
                {status === "published" ? "● Live" : "● Draft"}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={() => save("draft")}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", gap: 7, padding: "10px 20px",
              border: `1px solid ${SURF_BORDER}`, borderRadius: 10, background: "#fff",
              cursor: saving ? "not-allowed" : "pointer", fontFamily: FONT_SANS,
              fontSize: "0.84rem", fontWeight: 600, color: TEXT1, opacity: saving ? 0.6 : 1,
            }}
          >
            <Save size={14} /> {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            onClick={() => save("published")}
            disabled={saving}
            style={{
              display: "flex", alignItems: "center", gap: 7, padding: "10px 20px",
              background: G, border: "none", borderRadius: 10,
              cursor: saving ? "not-allowed" : "pointer", fontFamily: FONT_SANS,
              fontSize: "0.84rem", fontWeight: 700, color: "#fff",
              boxShadow: `0 4px 16px ${G}40`, opacity: saving ? 0.6 : 1,
            }}
          >
            <Globe size={14} /> {status === "published" ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Left — content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Title */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 20 }}>
            <label style={labelStyle}>Post Title *</label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter a compelling title…"
              style={{ ...inputStyle, fontSize: "1.1rem", fontFamily: FONT_SERIF, fontWeight: 700 }}
              onFocus={e => (e.target.style.borderColor = `${G}50`)}
              onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
            />
          </div>

          {/* Excerpt */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 20 }}>
            <label style={labelStyle}>Excerpt (shown in blog listing)</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              placeholder="A short description that appears in the blog listing and SEO…"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={e => (e.target.style.borderColor = `${G}50`)}
              onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
            />
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: TEXT3, marginTop: 6 }}>
              {excerpt.length}/300 characters
            </p>
          </div>

          {/* Content editor */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, overflow: "hidden" }}>
            {/* Mode switcher */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${SURF_BORDER}`, background: "#F9FAFB" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {(["write", "preview"] as EditorMode[]).map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    style={{
                      display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8,
                      border: mode === m ? `1px solid ${G}35` : "1px solid transparent",
                      background: mode === m ? `${G}10` : "transparent",
                      color: mode === m ? G : TEXT3, fontFamily: FONT_SANS, fontSize: "0.8rem",
                      fontWeight: mode === m ? 600 : 400, cursor: "pointer",
                    }}
                  >
                    {m === "write" ? <Edit3 size={12} /> : <Eye size={12} />}
                    {m === "write" ? "Write" : "Preview"}
                  </button>
                ))}
              </div>
              {mode === "write" && (
                <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: TEXT3 }}>HTML content</p>
              )}
            </div>

            {mode === "write" ? (
              <>
                {/* Formatting toolbar */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: "10px 14px", borderBottom: `1px solid ${SURF_BORDER}` }}>
                  {toolbar.map((t, i) => (
                    <ToolbarBtn key={i} icon={t.icon} label={t.label} onClick={t.action} />
                  ))}
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="<h2>Introduction</h2>&#10;<p>Start writing your article here…</p>&#10;&#10;<h3>Key Points</h3>&#10;<ul>&#10;  <li>Point one</li>&#10;  <li>Point two</li>&#10;</ul>"
                  style={{
                    width: "100%", minHeight: 420, padding: 16,
                    border: "none", outline: "none", resize: "vertical",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: "0.84rem", color: TEXT1, lineHeight: 1.7,
                    background: "#fff",
                  }}
                />
              </>
            ) : (
              <div
                className="blog-content"
                style={{ padding: 24, minHeight: 420 }}
                dangerouslySetInnerHTML={{ __html: content || "<p style='color:#8BA2BA;font-family:Inter,sans-serif'>Nothing to preview yet.</p>" }}
              />
            )}
          </div>
        </div>

        {/* Right — settings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Cover Media */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 18 }}>
            {/* Type toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <label style={labelStyle}>Cover Media</label>
              <div style={{ display: "flex", background: "#F4F7FD", borderRadius: 8, padding: 3, gap: 2 }}>
                {(["image", "video"] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => {
                      if (type !== coverMediaType) {
                        setCoverMediaType(type);
                        setCoverImageUrl("");
                      }
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "5px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                      fontFamily: FONT_SANS, fontSize: "0.72rem", fontWeight: coverMediaType === type ? 600 : 400,
                      background: coverMediaType === type ? "#fff" : "transparent",
                      color: coverMediaType === type ? TEXT1 : TEXT3,
                      boxShadow: coverMediaType === type ? "0 1px 4px rgba(11,26,46,0.08)" : "none",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {type === "image" ? <Image size={12} /> : <Film size={12} />}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            {coverImageUrl ? (
              <div style={{ position: "relative" }}>
                {coverMediaType === "video" ? (
                  <video
                    src={coverImageUrl}
                    controls
                    style={{ width: "100%", maxHeight: 180, borderRadius: 10, background: "#000", display: "block" }}
                  />
                ) : (
                  <img src={coverImageUrl} alt="Cover" style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10 }} />
                )}
                <button
                  onClick={() => setCoverImageUrl("")}
                  style={{ position: "absolute", top: 8, right: 8, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={13} color="#fff" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => !uploadingCover && coverInputRef.current?.click()}
                style={{
                  border: `2px dashed ${uploadingCover ? G : SURF_BORDER}`, borderRadius: 10, padding: "28px 16px",
                  textAlign: "center", cursor: uploadingCover ? "default" : "pointer", transition: "all 0.2s ease",
                  background: uploadingCover ? `${G}06` : "#F9FAFB",
                }}
                onMouseEnter={e => { if (!uploadingCover) (e.currentTarget as HTMLElement).style.borderColor = `${G}50`; }}
                onMouseLeave={e => { if (!uploadingCover) (e.currentTarget as HTMLElement).style.borderColor = SURF_BORDER; }}
              >
                {coverMediaType === "video"
                  ? <Film size={24} color={uploadingCover ? G : TEXT3} style={{ margin: "0 auto 8px" }} />
                  : <Upload size={24} color={uploadingCover ? G : TEXT3} style={{ margin: "0 auto 8px" }} />
                }

                {uploadingCover ? (
                  <>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: G, marginBottom: 8 }}>
                      {coverMediaType === "video" ? `Uploading… ${uploadProgress}%` : "Uploading…"}
                    </p>
                    {coverMediaType === "video" && (
                      <div style={{ height: 4, background: "#EBF0F8", borderRadius: 99, overflow: "hidden", maxWidth: 180, margin: "0 auto" }}>
                        <div style={{ height: "100%", width: `${uploadProgress}%`, background: G, borderRadius: 99, transition: "width 0.3s ease" }} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.82rem", color: TEXT2 }}>
                      Click to upload {coverMediaType === "video" ? "video" : "image"}
                    </p>
                    <p style={{ fontFamily: FONT_SANS, fontSize: "0.7rem", color: TEXT3, marginTop: 4 }}>
                      {coverMediaType === "video"
                        ? "MP4, MOV, WebM — up to 200 MB"
                        : "PNG, JPG, WebP — up to 5 MB"}
                    </p>
                  </>
                )}
              </div>
            )}

            <input
              ref={coverInputRef}
              type="file"
              accept={coverMediaType === "video" ? "video/*" : "image/*"}
              style={{ display: "none" }}
              onChange={handleCoverUpload}
            />
          </div>

          {/* Slug */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 18 }}>
            <label style={labelStyle}>URL Slug *</label>
            <input
              value={slug}
              onChange={e => { setSlug(slugify(e.target.value)); setSlugManual(true); }}
              placeholder="post-url-slug"
              style={{ ...inputStyle, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }}
              onFocus={e => (e.target.style.borderColor = `${G}50`)}
              onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
            />
            <p style={{ fontFamily: FONT_SANS, fontSize: "0.68rem", color: TEXT3, marginTop: 6 }}>
              /blog/{slug || "post-slug"}
            </p>
          </div>

          {/* Category */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 18 }}>
            <label style={labelStyle}>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{ ...inputStyle, cursor: "pointer" }}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Author + Read time */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={labelStyle}>Author *</label>
              <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="e.g. Rajesh Sharma"
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = `${G}50`)}
                onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
              />
            </div>
            <div>
              <label style={labelStyle}>Read Time (minutes)</label>
              <input
                type="number"
                min={1} max={60}
                value={readTime}
                onChange={e => setReadTime(Number(e.target.value))}
                style={{ ...inputStyle, width: 100 }}
                onFocus={e => (e.target.style.borderColor = `${G}50`)}
                onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
              />
            </div>
          </div>

          {/* Tags */}
          <div style={{ background: "#fff", border: `1px solid ${SURF_BORDER}`, borderRadius: 14, padding: 18 }}>
            <label style={labelStyle}>Tags (up to 8)</label>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                placeholder="Add tag + Enter"
                style={{ ...inputStyle, flex: 1 }}
                onFocus={e => (e.target.style.borderColor = `${G}50`)}
                onBlur={e => (e.target.style.borderColor = SURF_BORDER)}
              />
              <button
                type="button"
                onClick={addTag}
                style={{ padding: "10px 14px", background: `${G}12`, border: `1px solid ${G}30`, borderRadius: 10, cursor: "pointer" }}
              >
                <Tag size={14} color={G} />
              </button>
            </div>
            {tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {tags.map(tag => (
                  <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 100, background: "#EBF0F8", fontFamily: FONT_SANS, fontSize: "0.72rem", color: TEXT2 }}>
                    #{tag}
                    <button type="button" onClick={() => removeTag(tag)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex" }}>
                      <X size={10} color={TEXT3} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .blog-content { font-family: 'Poppins', sans-serif; color: #536280; line-height: 1.85; font-size: 0.95rem; }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 { font-family: 'Poppins', sans-serif; color: #0B1A2E; font-weight: 700; margin: 1.5rem 0 0.75rem; }
        .blog-content h2 { font-size: 1.4rem; }
        .blog-content h3 { font-size: 1.15rem; }
        .blog-content p { margin-bottom: 1.2rem; }
        .blog-content ul, .blog-content ol { padding-left: 1.5rem; margin-bottom: 1.2rem; }
        .blog-content li { margin-bottom: 0.4rem; }
        .blog-content blockquote { border-left: 3px solid ${G}; padding: 12px 20px; margin: 1.5rem 0; background: ${G}08; border-radius: 0 10px 10px 0; font-style: italic; color: #0B1A2E; }
        .blog-content strong { font-weight: 700; color: #0B1A2E; }
        .blog-content a { color: ${G}; text-decoration: underline; }
        .blog-content img { max-width: 100%; border-radius: 10px; margin: 1rem 0; }
        .blog-content hr { border: none; border-top: 1px solid rgba(11,26,46,0.09); margin: 1.5rem 0; }
        select option { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
}
