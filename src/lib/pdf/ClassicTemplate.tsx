import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import type { ResumeData, TemplateId } from "../resume-schema";
import { cleanText } from "../sanitize";

interface TemplateConfig {
  fontFamily: string;
  primaryColor: string;
  accentColor: string;
  headerStyle:
    | "classic"
    | "modern"
    | "minimal"
    | "graphic"
    | "split"
    | "elegant-compact"
    | "left-accent";
  personalLayout: "list" | "grid" | "inline-bullets" | "shaded-box" | "two-col-plain";
  tableStyle: "standard" | "minimal" | "striped" | "grid-dot" | "bold-header";
  sectionHeadingStyle: "bottom-line" | "left-bar" | "double-line" | "block" | "dotted-bottom";
  borderColor: string;
  tableHeaderBg: string;
  borderLeftWeight?: number;
  sectionUppercase?: boolean;
}

const TEMPLATE_CONFIGS: Record<TemplateId, TemplateConfig> = {
  classic: {
    fontFamily: "Helvetica",
    primaryColor: "#111111",
    accentColor: "#333333",
    headerStyle: "classic",
    personalLayout: "list",
    tableStyle: "standard",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#444444",
    tableHeaderBg: "#f3f4f6",
    sectionUppercase: true,
  },
  modern: {
    fontFamily: "Helvetica",
    primaryColor: "#0f766e", // Teal
    accentColor: "#0d9488",
    headerStyle: "modern",
    personalLayout: "grid",
    tableStyle: "striped",
    sectionHeadingStyle: "left-bar",
    borderColor: "#99f6e4",
    tableHeaderBg: "#f0fdfa",
    borderLeftWeight: 4,
    sectionUppercase: true,
  },
  minimal: {
    fontFamily: "Times-Roman",
    primaryColor: "#222222",
    accentColor: "#555555",
    headerStyle: "minimal",
    personalLayout: "inline-bullets",
    tableStyle: "minimal",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#cccccc",
    tableHeaderBg: "#fafafa",
    sectionUppercase: false,
  },
  graphic: {
    fontFamily: "Helvetica",
    primaryColor: "#1e293b", // Slate
    accentColor: "#475569",
    headerStyle: "graphic",
    personalLayout: "inline-bullets",
    tableStyle: "bold-header",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#cbd5e1",
    tableHeaderBg: "#f1f5f9",
    sectionUppercase: true,
  },
  emerald: {
    fontFamily: "Helvetica",
    primaryColor: "#047857", // Emerald
    accentColor: "#059669",
    headerStyle: "split",
    personalLayout: "inline-bullets",
    tableStyle: "striped",
    sectionHeadingStyle: "dotted-bottom",
    borderColor: "#a7f3d0",
    tableHeaderBg: "#ecfdf5",
    sectionUppercase: true,
  },
  burgundy: {
    fontFamily: "Times-Roman",
    primaryColor: "#800020", // Burgundy
    accentColor: "#991b1b",
    headerStyle: "elegant-compact",
    personalLayout: "list",
    tableStyle: "grid-dot",
    sectionHeadingStyle: "double-line",
    borderColor: "#fca5a5",
    tableHeaderBg: "#fff5f5",
    sectionUppercase: true,
  },
  royal: {
    fontFamily: "Helvetica",
    primaryColor: "#1d4ed8", // Royal Blue
    accentColor: "#2563eb",
    headerStyle: "left-accent",
    personalLayout: "grid",
    tableStyle: "bold-header",
    sectionHeadingStyle: "left-bar",
    borderColor: "#bfdbfe",
    tableHeaderBg: "#eff6ff",
    borderLeftWeight: 6,
    sectionUppercase: true,
  },
  charcoal: {
    fontFamily: "Helvetica",
    primaryColor: "#374151", // Charcoal
    accentColor: "#4b5563",
    headerStyle: "classic",
    personalLayout: "shaded-box",
    tableStyle: "standard",
    sectionHeadingStyle: "block",
    borderColor: "#d1d5db",
    tableHeaderBg: "#f9fafb",
    sectionUppercase: false,
  },
  bronze: {
    fontFamily: "Times-Roman",
    primaryColor: "#7c2d12", // Bronze
    accentColor: "#9a3412",
    headerStyle: "minimal",
    personalLayout: "two-col-plain",
    tableStyle: "grid-dot",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#fed7aa",
    tableHeaderBg: "#fff7ed",
    sectionUppercase: false,
  },
  navy: {
    fontFamily: "Helvetica",
    primaryColor: "#1e3a8a", // Navy
    accentColor: "#1d4ed8",
    headerStyle: "split",
    personalLayout: "grid",
    tableStyle: "bold-header",
    sectionHeadingStyle: "left-bar",
    borderColor: "#bfdbfe",
    tableHeaderBg: "#eff6ff",
    borderLeftWeight: 3,
    sectionUppercase: true,
  },
  forest: {
    fontFamily: "Helvetica",
    primaryColor: "#14532d", // Forest Green
    accentColor: "#166534",
    headerStyle: "modern",
    personalLayout: "shaded-box",
    tableStyle: "striped",
    sectionHeadingStyle: "left-bar",
    borderColor: "#bbf7d0",
    tableHeaderBg: "#f0fdf4",
    borderLeftWeight: 4,
    sectionUppercase: true,
  },
  plum: {
    fontFamily: "Times-Roman",
    primaryColor: "#581c87", // Plum
    accentColor: "#6b21a8",
    headerStyle: "elegant-compact",
    personalLayout: "inline-bullets",
    tableStyle: "minimal",
    sectionHeadingStyle: "double-line",
    borderColor: "#e9d5ff",
    tableHeaderBg: "#f3e8ff",
    sectionUppercase: false,
  },
  orange: {
    fontFamily: "Helvetica",
    primaryColor: "#c2410c", // Orange
    accentColor: "#ea580c",
    headerStyle: "left-accent",
    personalLayout: "two-col-plain",
    tableStyle: "striped",
    sectionHeadingStyle: "block",
    borderColor: "#ffedd5",
    tableHeaderBg: "#fff7ed",
    borderLeftWeight: 4,
    sectionUppercase: true,
  },
  steel: {
    fontFamily: "Helvetica",
    primaryColor: "#334155", // Steel Blue
    accentColor: "#475569",
    headerStyle: "graphic",
    personalLayout: "grid",
    tableStyle: "standard",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#cbd5e1",
    tableHeaderBg: "#f1f5f9",
    sectionUppercase: true,
  },
  "classic-serif": {
    fontFamily: "Times-Roman",
    primaryColor: "#111111",
    accentColor: "#333333",
    headerStyle: "classic",
    personalLayout: "list",
    tableStyle: "standard",
    sectionHeadingStyle: "bottom-line",
    borderColor: "#444444",
    tableHeaderBg: "#f3f4f6",
    sectionUppercase: true,
  },
};

function parseListItems(text: string): string[] {
  if (!text) return [];
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length > 1) {
    return lines;
  }
  return text
    .split(/[,;]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function ClassicResume({
  data,
  template = "classic",
}: {
  data: ResumeData;
  template?: TemplateId;
}) {
  const p = data.personal;
  const config = TEMPLATE_CONFIGS[template] || TEMPLATE_CONFIGS.classic;
  const photoSize = p.photoSize || 80;
  const photoPosition = p.photoPosition || "right";

  const isSerif = config.fontFamily === "Times-Roman";
  const regularFont = isSerif ? "Times-Roman" : "Helvetica";
  const boldFont = isSerif ? "Times-Bold" : "Helvetica-Bold";
  const italicFont = isSerif ? "Times-Italic" : "Helvetica-Oblique";

  const cust = data.customization || {};
  const formats = cust.formats || {};
  const sectionNames = cust.sectionNames || {};
  const showSections = cust.showSections || {};
  const spacingOpt = cust.spacing || "normal";

  let pagePadding = 36;
  let sectionMargin = 12;
  let textFontSize = 9.5;
  let tableCellMargin = 4;
  let tableCellFontSize = 8;
  let tableHeaderCellFontSize = 8.5;
  let titleMargin = 15;
  let textLineHeight = 1.35;
  let textBlockFontSize = 9;
  let signatureMarginTop = 20;
  let rowGap = 3;

  if (spacingOpt === "compact") {
    pagePadding = 24;
    sectionMargin = 6;
    textFontSize = 8.5;
    tableCellMargin = 2.5;
    tableCellFontSize = 7.5;
    tableHeaderCellFontSize = 8;
    titleMargin = 10;
    textLineHeight = 1.2;
    textBlockFontSize = 8;
    signatureMarginTop = 10;
    rowGap = 2;
  } else if (spacingOpt === "spacious") {
    pagePadding = 44;
    sectionMargin = 16;
    textFontSize = 10.5;
    tableCellMargin = 5;
    tableCellFontSize = 8.5;
    tableHeaderCellFontSize = 9;
    titleMargin = 20;
    textLineHeight = 1.45;
    textBlockFontSize = 10;
    signatureMarginTop = 26;
    rowGap = 4;
  }

  const styles = StyleSheet.create({
    page: {
      paddingTop: pagePadding,
      paddingBottom: pagePadding,
      paddingLeft: pagePadding,
      paddingRight: pagePadding,
      fontFamily: regularFont,
      fontSize: textFontSize,
      color: "#111111",
      lineHeight: textLineHeight,
    },
    // Header Style: Classic
    classicTitle: {
      fontSize: 14,
      fontFamily: boldFont,
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: 1.5,
      marginBottom: titleMargin,
      borderBottomWidth: 1.5,
      borderBottomColor: config.primaryColor,
      paddingBottom: 4,
    },
    // Header Style: Modern
    modernHeader: {
      marginBottom: titleMargin,
      borderBottomWidth: 2,
      borderBottomColor: config.primaryColor,
      paddingBottom: 6,
    },
    modernTitle: {
      fontSize: 18,
      fontFamily: boldFont,
      textTransform: "uppercase",
      color: config.primaryColor,
      letterSpacing: 1,
    },
    modernSubtitle: {
      fontSize: textFontSize,
      marginTop: 6,
      color: "#555555",
    },
    // Header Style: Graphic
    graphicHeaderBlock: {
      backgroundColor: config.primaryColor,
      padding: 12,
      color: "#ffffff",
      marginBottom: 12,
      borderRadius: 4,
    },
    graphicTitle: {
      fontSize: 16,
      fontFamily: boldFont,
      textTransform: "uppercase",
      color: "#ffffff",
      letterSpacing: 1,
      borderBottomWidth: 1,
      borderBottomColor: config.accentColor,
      paddingBottom: 4,
      marginBottom: 6,
    },
    graphicGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    graphicCol: {
      width: "50%",
      fontSize: 8.5,
      marginBottom: 3,
    },
    graphicLabel: {
      fontFamily: boldFont,
      color: "#cbd5e1",
    },
    graphicValue: {
      color: "#f8fafc",
    },
    // Header Style: Split
    splitHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: titleMargin,
      borderBottomWidth: 2,
      borderBottomColor: config.primaryColor,
      paddingBottom: 8,
    },
    splitLeft: {
      flexDirection: "column",
      width: "50%",
    },
    splitRight: {
      flexDirection: "column",
      width: "50%",
      alignItems: "flex-end",
      fontSize: 8,
      lineHeight: 1.3,
    },
    // Header Style: Elegant Compact
    elegantHeader: {
      alignItems: "center",
      marginBottom: titleMargin,
      paddingBottom: 6,
      borderTopWidth: 1,
      borderTopColor: config.primaryColor,
      borderBottomWidth: 1,
      borderBottomColor: config.primaryColor,
      paddingTop: 6,
    },
    elegantTitle: {
      fontSize: 18,
      fontFamily: boldFont,
      letterSpacing: 2,
      color: config.primaryColor,
    },
    // Header Style: Left Accent
    leftAccentHeader: {
      flexDirection: "row",
      alignItems: "stretch",
      marginBottom: titleMargin,
    },
    leftAccentBar: {
      width: 8,
      backgroundColor: config.primaryColor,
      marginRight: 10,
    },
    leftAccentContent: {
      flex: 1,
      justifyContent: "center",
    },
    leftAccentTitle: {
      fontSize: 18,
      fontFamily: boldFont,
      color: config.primaryColor,
    },

    // Section styles
    sectionContainer: {
      marginBottom: sectionMargin,
    },
    personalGrid: {
      flexDirection: "column",
      marginLeft: 5,
      marginBottom: 4,
    },
    personalRow: {
      flexDirection: "row",
      marginBottom: 3,
    },
    personalLabel: {
      fontFamily: boldFont,
      width: 130,
      fontSize: textFontSize,
    },
    personalValue: {
      flex: 1,
      fontSize: textFontSize,
    },
    // Shaded box details
    shadedBox: {
      backgroundColor: config.tableHeaderBg,
      borderWidth: 0.5,
      borderColor: config.borderColor,
      borderRadius: 4,
      padding: 8,
      marginLeft: 5,
      marginBottom: 4,
    },
    // Inline bullets
    inlineBulletsText: {
      fontSize: 8.5,
      color: "#333333",
      textAlign: "center",
      marginTop: 4,
      lineHeight: 1.4,
    },
    // Table styles
    table: {
      width: "auto",
      marginBottom: 4,
      marginLeft: 5,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCellHeader: {
      margin: tableCellMargin,
      fontSize: tableHeaderCellFontSize,
      fontFamily: boldFont,
    },
    tableCell: {
      margin: tableCellMargin,
      fontSize: tableCellFontSize,
    },
    // Columns flex ratios
    colDegree: { flex: 2 },
    colInstitution: { flex: 3 },
    colBoard: { flex: 2.5 },
    colYear: { flex: 1.25, textAlign: "center" },
    colGrade: { flex: 1.25, textAlign: "center" },
    colOrg: { flex: 2.5 },
    colRole: { flex: 2.5 },
    colDuration: { flex: 2, textAlign: "center" },
    colResp: { flex: 4 },
    textBlock: {
      marginLeft: 5,
      fontSize: textBlockFontSize,
      lineHeight: 1.4,
    },
    declarationText: {
      fontFamily: italicFont,
      marginLeft: 5,
      marginBottom: titleMargin,
      fontSize: textBlockFontSize,
      lineHeight: 1.4,
    },
    signatureBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: signatureMarginTop,
      marginLeft: 5,
      fontSize: textBlockFontSize,
    },
    sigLeft: {
      flexDirection: "column",
    },
    sigRight: {
      alignItems: "flex-end",
    },
  });

  const getSectionHeadingStyle = () => {
    const base = {
      fontSize: 10.5,
      fontFamily: boldFont,
      marginTop: 8,
      marginBottom: 5,
      paddingBottom: 2,
      textTransform: config.sectionUppercase === false ? "none" : ("uppercase" as any),
    };
    if (config.sectionHeadingStyle === "left-bar") {
      return {
        ...base,
        color: config.primaryColor,
        borderLeftWidth: config.borderLeftWeight || 3,
        borderLeftColor: config.primaryColor,
        paddingLeft: 6,
      };
    }
    if (config.sectionHeadingStyle === "double-line") {
      return {
        ...base,
        color: config.primaryColor,
        borderTopWidth: 0.5,
        borderTopColor: config.borderColor,
        borderBottomWidth: 0.5,
        borderBottomColor: config.borderColor,
        paddingTop: 2,
        paddingBottom: 2,
      };
    }
    if (config.sectionHeadingStyle === "block") {
      return {
        ...base,
        color: "#ffffff",
        backgroundColor: config.primaryColor,
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 2,
      };
    }
    if (config.sectionHeadingStyle === "dotted-bottom") {
      return {
        ...base,
        color: config.primaryColor,
        borderBottomWidth: 0.5,
        borderBottomColor: config.borderColor,
        borderBottomStyle: "dashed" as any,
        paddingBottom: 3,
      };
    }
    // bottom-line or default
    return {
      ...base,
      color: config.primaryColor,
      borderBottomWidth: 0.5,
      borderBottomColor: config.borderColor,
      paddingBottom: 2,
    };
  };

  const getSectionName = (key: string, defaultName: string) => {
    return (sectionNames as any)[key] || defaultName;
  };

  const isShown = (
    key:
      | "summary"
      | "education"
      | "experience"
      | "skills"
      | "achievements"
      | "strengths"
      | "certifications"
      | "declaration",
  ) => {
    return showSections[key] !== false;
  };

  const renderFormattedList = (text: string, format: string) => {
    const items = parseListItems(text);
    if (items.length === 0) return null;

    if (format === "paragraph") {
      return <Text style={styles.textBlock}>{cleanText(text)}</Text>;
    }

    if (format === "bullets") {
      return (
        <View style={{ marginLeft: 5, marginTop: 2 }}>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={{ flexDirection: "row", marginBottom: rowGap, alignItems: "flex-start" }}
            >
              <Text style={{ fontSize: textBlockFontSize, marginRight: 6 }}>•</Text>
              <Text style={{ fontSize: textBlockFontSize, flex: 1 }}>{cleanText(item)}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (format === "grid3" || format === "grid2") {
      const colWidth = format === "grid3" ? "33%" : "50%";
      return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginLeft: 5, marginTop: 2 }}>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                width: colWidth,
                marginBottom: rowGap + 1,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: textBlockFontSize - 1,
                  marginRight: 5,
                  color: config.primaryColor,
                }}
              >
                •
              </Text>
              <Text style={{ fontSize: textBlockFontSize }}>{cleanText(item)}</Text>
            </View>
          ))}
        </View>
      );
    }

    if (format === "numbered") {
      return (
        <View style={{ marginLeft: 5, marginTop: 2 }}>
          {items.map((item, idx) => (
            <View
              key={idx}
              style={{ flexDirection: "row", marginBottom: rowGap, alignItems: "flex-start" }}
            >
              <Text style={{ fontSize: textBlockFontSize, fontFamily: boldFont, marginRight: 5 }}>
                {idx + 1}.
              </Text>
              <Text style={{ fontSize: textBlockFontSize, flex: 1 }}>{cleanText(item)}</Text>
            </View>
          ))}
        </View>
      );
    }

    return <Text style={styles.textBlock}>{items.join(", ")}</Text>;
  };

  const getTableStyle = () => {
    if (config.tableStyle === "minimal") {
      return {
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: config.borderColor,
      };
    }
    return {
      borderWidth: 0.5,
      borderStyle: config.tableStyle === "grid-dot" ? ("dashed" as any) : ("solid" as any),
      borderColor: config.borderColor,
    };
  };

  const getRowStyle = (index: number, isHeader = false) => {
    const base = { flexDirection: "row" as any };
    if (isHeader) {
      if (config.tableStyle === "bold-header") {
        return { ...base, backgroundColor: config.primaryColor };
      }
      return { ...base, backgroundColor: config.tableHeaderBg };
    }
    if (config.tableStyle === "striped" && index % 2 === 1) {
      return { ...base, backgroundColor: config.tableHeaderBg };
    }
    return base;
  };

  const getHeaderCellTextStyle = () => {
    return {
      margin: 4,
      fontSize: 8.5,
      fontFamily: boldFont,
      color: config.tableStyle === "bold-header" ? "#ffffff" : config.primaryColor,
    };
  };

  const getCellBorderStyle = (isLastColumn = false) => {
    const style: any = {};
    if (config.tableStyle === "minimal") {
      if (!isLastColumn) {
        style.borderRightWidth = 0;
      }
    } else {
      if (!isLastColumn) {
        style.borderRightWidth = 0.5;
        style.borderRightColor = config.borderColor;
        style.borderRightStyle = config.tableStyle === "grid-dot" ? "dashed" : "solid";
      }
    }
    return style;
  };

  return (
    <Document title={`${cleanText(p.fullName)} - Resume`} author={cleanText(p.fullName)}>
      <Page size="A4" style={styles.page}>
        {/* Title Header Renders based on headerStyle */}
        {config.headerStyle === "graphic" ? (
          <View style={[styles.graphicHeaderBlock, p.photo ? { flexDirection: "row", alignItems: "center", gap: 12 } : {}]}>
            {p.photo && photoPosition === "left" && (
              <Image src={p.photo} style={{ width: photoSize, height: photoSize, borderRadius: 4, objectFit: "cover" }} />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.graphicTitle}>
                {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
              </Text>
              <View style={styles.graphicGrid}>
                <View style={styles.graphicCol}>
                  <Text>
                    <Text style={styles.graphicLabel}>Address: </Text>
                    <Text style={styles.graphicValue}>{cleanText(p.address) || "-"}</Text>
                  </Text>
                </View>
                <View style={styles.graphicCol}>
                  <Text>
                    <Text style={styles.graphicLabel}>Mobile: </Text>
                    <Text style={styles.graphicValue}>{cleanText(p.phone) || "-"}</Text>
                  </Text>
                </View>
                <View style={styles.graphicCol}>
                  <Text>
                    <Text style={styles.graphicLabel}>Email ID: </Text>
                    <Text style={styles.graphicValue}>{cleanText(p.email) || "-"}</Text>
                  </Text>
                </View>
                <View style={styles.graphicCol}>
                  <Text>
                    <Text style={styles.graphicLabel}>Date of Birth: </Text>
                    <Text style={styles.graphicValue}>{cleanText(p.dob) || "-"}</Text>
                  </Text>
                </View>
                <View style={styles.graphicCol}>
                  <Text>
                    <Text style={styles.graphicLabel}>Languages: </Text>
                    <Text style={styles.graphicValue}>{cleanText(p.languages) || "-"}</Text>
                  </Text>
                </View>
              </View>
            </View>
            {p.photo && photoPosition === "right" && (
              <Image src={p.photo} style={{ width: photoSize, height: photoSize, borderRadius: 4, objectFit: "cover" }} />
            )}
          </View>
        ) : config.headerStyle === "split" ? (
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: titleMargin, borderBottomWidth: 2, borderBottomColor: config.primaryColor, paddingBottom: 8 }}>
            {p.photo && photoPosition === "left" && (
              <Image src={p.photo} style={{ width: photoSize, height: photoSize, borderRadius: 4, objectFit: "cover" }} />
            )}
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
              <View style={styles.splitLeft}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: boldFont,
                    color: config.primaryColor,
                    textTransform: "uppercase",
                  }}
                >
                  {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
                </Text>
                <Text style={{ fontSize: 9, marginTop: 6, color: "#555555", fontFamily: italicFont }}>
                  Curriculum Vitae
                </Text>
              </View>
              <View style={styles.splitRight}>
                <Text style={{ fontFamily: boldFont }}>{cleanText(p.address)}</Text>
                <Text>Phone: {cleanText(p.phone)}</Text>
                <Text>Email: {cleanText(p.email)}</Text>
                <Text>
                  DOB: {cleanText(p.dob)}
                </Text>
                <Text>Languages: {cleanText(p.languages)}</Text>
              </View>
            </View>
            {p.photo && photoPosition === "right" && (
              <Image src={p.photo} style={{ width: photoSize, height: photoSize, borderRadius: 4, objectFit: "cover" }} />
            )}
          </View>
        ) : config.headerStyle === "left-accent" ? (
          <View style={styles.leftAccentHeader}>
            <View style={styles.leftAccentBar} />
            <View style={styles.leftAccentContent}>
              <Text style={styles.leftAccentTitle}>
                {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: config.accentColor,
                  fontFamily: boldFont,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                Curriculum Vitae
              </Text>
            </View>
          </View>
        ) : config.headerStyle === "elegant-compact" ? (
          <View style={styles.elegantHeader}>
            <Text style={styles.elegantTitle}>
              {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
            </Text>
            <Text style={{ fontSize: 8.5, fontFamily: italicFont, color: "#555555", marginTop: 6 }}>
              Curriculum Vitae
            </Text>
          </View>
        ) : config.headerStyle === "modern" ? (
          <View style={styles.modernHeader}>
            <Text style={styles.modernTitle}>
              {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
            </Text>
            <Text style={styles.modernSubtitle}>Curriculum Vitae</Text>
          </View>
        ) : config.headerStyle === "minimal" ? (
          <View style={{ marginBottom: 12, alignItems: "center" }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: boldFont,
                color: config.primaryColor,
                letterSpacing: 1.5,
                textTransform: "uppercase",
              }}
            >
              {cleanText(p.fullName) || "Resume / Curriculum Vitae"}
            </Text>
            <View
              style={{ width: 40, height: 1.5, backgroundColor: config.primaryColor, marginTop: 5 }}
            />
          </View>
        ) : (
          <Text style={styles.classicTitle}>Resume / Curriculum Vitae</Text>
        )}

        {/* 1. Personal Details (Skip if graphic or split header style since details are already printed there) */}
        {config.headerStyle !== "graphic" && config.headerStyle !== "split" && (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("personal", "1. Personal Details:-")}
            </Text>

            <View style={p.photo ? { flexDirection: photoPosition === "left" ? "row" : "row-reverse", alignItems: "center", gap: 12 } : {}}>
              {p.photo && (
                <Image src={p.photo} style={{ width: photoSize, height: photoSize, borderRadius: 4, objectFit: "cover" }} />
              )}
              <View style={p.photo ? { flex: 1 } : {}}>
                {config.personalLayout === "list" && (
                  <View style={styles.personalGrid}>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>1) Name:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.fullName) || "-"}</Text>
                    </View>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>2) Address:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.address) || "-"}</Text>
                    </View>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>3) Mobile Number:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.phone) || "-"}</Text>
                    </View>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>4) Email ID:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.email) || "-"}</Text>
                    </View>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>5) Date of birth:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.dob) || "-"}</Text>
                    </View>
                    <View style={styles.personalRow}>
                      <Text style={styles.personalLabel}>6) Language Known:</Text>
                      <Text style={styles.personalValue}>{cleanText(p.languages) || "-"}</Text>
                    </View>
                  </View>
                )}

                {config.personalLayout === "grid" && (
                  <View
                    style={[
                      styles.personalGrid,
                      { flexDirection: "row", flexWrap: "wrap", marginLeft: 5 },
                    ]}
                  >
                    <View style={{ width: "50%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Name: </Text>
                        <Text>{cleanText(p.fullName) || "-"}</Text>
                      </Text>
                    </View>
                    <View style={{ width: "50%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Phone: </Text>
                        <Text>{cleanText(p.phone) || "-"}</Text>
                      </Text>
                    </View>
                    <View style={{ width: "50%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Email: </Text>
                        <Text>{cleanText(p.email) || "-"}</Text>
                      </Text>
                    </View>
                    <View style={{ width: "50%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>DOB: </Text>
                        <Text>{cleanText(p.dob) || "-"}</Text>
                      </Text>
                    </View>
                    <View style={{ width: "50%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Languages: </Text>
                        <Text>{cleanText(p.languages) || "-"}</Text>
                      </Text>
                    </View>

                    <View style={{ width: "100%", marginBottom: 4 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Address: </Text>
                        <Text>{cleanText(p.address) || "-"}</Text>
                      </Text>
                    </View>
                  </View>
                )}

                {config.personalLayout === "inline-bullets" && (
                  <Text style={styles.inlineBulletsText}>
                    {cleanText(p.address) || "-"} • Mobile: {cleanText(p.phone) || "-"} • Email:{" "}
                    {cleanText(p.email) || "-"} • DOB: {cleanText(p.dob) || "-"} • Languages:{" "}
                    {cleanText(p.languages) || "-"}
                  </Text>
                )}

                {config.personalLayout === "shaded-box" && (
                  <View style={styles.shadedBox}>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                      <View style={{ width: "50%", marginBottom: 4 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>Name: </Text>
                          <Text>{cleanText(p.fullName) || "-"}</Text>
                        </Text>
                      </View>
                      <View style={{ width: "50%", marginBottom: 4 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>Phone: </Text>
                          <Text>{cleanText(p.phone) || "-"}</Text>
                        </Text>
                      </View>
                      <View style={{ width: "50%", marginBottom: 4 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>Email: </Text>
                          <Text>{cleanText(p.email) || "-"}</Text>
                        </Text>
                      </View>
                      <View style={{ width: "50%", marginBottom: 4 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>DOB: </Text>
                          <Text>{cleanText(p.dob) || "-"}</Text>
                        </Text>
                      </View>
                      <View style={{ width: "50%", marginBottom: 4 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>Languages: </Text>
                          <Text>{cleanText(p.languages) || "-"}</Text>
                        </Text>
                      </View>

                      <View style={{ width: "100%", marginTop: 2 }}>
                        <Text>
                          <Text style={{ fontFamily: boldFont }}>Address: </Text>
                          <Text>{cleanText(p.address) || "-"}</Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                )}

                {config.personalLayout === "two-col-plain" && (
                  <View style={{ flexDirection: "row", marginLeft: 5 }}>
                    <View style={{ flex: 1, gap: 3 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Name: </Text>
                        {cleanText(p.fullName)}
                      </Text>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Address: </Text>
                        {cleanText(p.address)}
                      </Text>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Mobile: </Text>
                        {cleanText(p.phone)}
                      </Text>
                    </View>
                    <View style={{ flex: 1, gap: 3 }}>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Email: </Text>
                        {cleanText(p.email)}
                      </Text>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Date of Birth: </Text>
                        {cleanText(p.dob)}
                      </Text>
                      <Text>
                        <Text style={{ fontFamily: boldFont }}>Languages Known: </Text>
                        {cleanText(p.languages)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        {/* 2. Professional Summary */}
        {isShown("summary") && data.summary ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("summary", "Professional Summary:-")}
            </Text>
            {renderFormattedList(data.summary, formats.summary || "paragraph")}
          </View>
        ) : null}

        {/* 3) Educational Details */}
        {isShown("education") && data.education && data.education.length > 0 && (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("education", "2) Educational Details :-")}
            </Text>
            <View style={[styles.table, getTableStyle()]}>
              {/* Table Header */}
              <View style={getRowStyle(0, true)}>
                <View style={[styles.colDegree, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Degree / Course</Text>
                </View>
                <View style={[styles.colInstitution, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Institution</Text>
                </View>
                <View style={[styles.colBoard, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Board / Univ</Text>
                </View>
                <View style={[styles.colYear, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Year</Text>
                </View>
                <View style={[styles.colGrade, getCellBorderStyle(true)]}>
                  <Text style={getHeaderCellTextStyle()}>Grade</Text>
                </View>
              </View>
              {/* Table Body */}
              {data.education.length > 0 ? (
                data.education.map((ed, i) => (
                  <View
                    key={i}
                    style={[
                      getRowStyle(i, false),
                      { borderTopWidth: 0.5, borderColor: config.borderColor },
                    ]}
                  >
                    <View style={[styles.colDegree, getCellBorderStyle(false)]}>
                      <Text style={styles.tableCell}>{cleanText(ed.degree) || "-"}</Text>
                    </View>
                    <View style={[styles.colInstitution, getCellBorderStyle(false)]}>
                      <Text style={styles.tableCell}>{cleanText(ed.institution) || "-"}</Text>
                    </View>
                    <View style={[styles.colBoard, getCellBorderStyle(false)]}>
                      <Text style={styles.tableCell}>{cleanText(ed.board) || "-"}</Text>
                    </View>
                    <View style={[styles.colYear, getCellBorderStyle(false)]}>
                      <Text style={[styles.tableCell, { textAlign: "center" }]}>
                        {ed.fromYear && ed.toYear
                          ? `${cleanText(ed.fromYear)} - ${cleanText(ed.toYear)}`
                          : cleanText(ed.fromYear) || cleanText(ed.toYear) || "-"}
                      </Text>
                    </View>
                    <View style={[styles.colGrade, getCellBorderStyle(true)]}>
                      <Text style={[styles.tableCell, { textAlign: "center" }]}>
                        {cleanText(ed.grade) || "-"}
                      </Text>
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={[
                    getRowStyle(0, false),
                    { borderTopWidth: 0.5, borderColor: config.borderColor },
                  ]}
                >
                  <View style={{ flex: 1, padding: 6 }}>
                    <Text style={[styles.tableCell, { textAlign: "center", fontStyle: "italic" }]}>
                      No education records added yet.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 4) Experience Details */}
        {isShown("experience") && data.experience && data.experience.length > 0 && (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("experience", "3) Experience Details:-")}
            </Text>
            <View style={[styles.table, getTableStyle()]}>
              {/* Table Header */}
              <View style={getRowStyle(0, true)}>
                <View style={[styles.colOrg, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Organisation</Text>
                </View>
                <View style={[styles.colRole, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Designation</Text>
                </View>
                <View style={[styles.colDuration, getCellBorderStyle(false)]}>
                  <Text style={getHeaderCellTextStyle()}>Duration</Text>
                </View>
                <View style={[styles.colResp, getCellBorderStyle(true)]}>
                  <Text style={getHeaderCellTextStyle()}>Responsibilities</Text>
                </View>
              </View>
              {/* Table Body */}
              {data.experience.length > 0 ? (
                data.experience.map((e, i) => (
                  <View
                    key={i}
                    style={[
                      getRowStyle(i, false),
                      { borderTopWidth: 0.5, borderColor: config.borderColor },
                    ]}
                  >
                    <View style={[styles.colOrg, getCellBorderStyle(false)]}>
                      <Text style={styles.tableCell}>{cleanText(e.company) || "-"}</Text>
                    </View>
                    <View style={[styles.colRole, getCellBorderStyle(false)]}>
                      <Text style={styles.tableCell}>{cleanText(e.role) || "-"}</Text>
                    </View>
                    <View style={[styles.colDuration, getCellBorderStyle(false)]}>
                      <Text style={[styles.tableCell, { textAlign: "center" }]}>
                        {e.fromDate && e.toDate
                          ? `${cleanText(e.fromDate)} - ${cleanText(e.toDate)}`
                          : cleanText(e.fromDate) || cleanText(e.toDate) || "-"}
                      </Text>
                    </View>
                    <View style={[styles.colResp, getCellBorderStyle(true)]}>
                      <Text style={styles.tableCell}>{cleanText(e.responsibilities) || "-"}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <View
                  style={[
                    getRowStyle(0, false),
                    { borderTopWidth: 0.5, borderColor: config.borderColor },
                  ]}
                >
                  <View style={{ flex: 1, padding: 6 }}>
                    <Text style={[styles.tableCell, { textAlign: "center", fontStyle: "italic" }]}>
                      No experience records added yet.
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* 5. Key Skills */}
        {isShown("skills") && data.skills ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("skills", "Key Skills & Expertise:-")}
            </Text>
            {renderFormattedList(data.skills, formats.skills || "grid3")}
          </View>
        ) : null}

        {/* 6) Special Achievements */}
        {isShown("achievements") && data.achievements ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("achievements", "4) Special Achievements:-")}
            </Text>
            {renderFormattedList(data.achievements, formats.achievements || "bullets")}
          </View>
        ) : null}

        {/* 7) Strengths */}
        {isShown("strengths") && data.strengths ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("strengths", "5) Strengths:")}
            </Text>
            {renderFormattedList(data.strengths, formats.strengths || "bullets")}
          </View>
        ) : null}

        {/* 8. Certifications */}
        {isShown("certifications") && data.certifications ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={getSectionHeadingStyle()}>
              {getSectionName("certifications", "Certifications & Trainings:-")}
            </Text>
            {renderFormattedList(data.certifications, formats.certifications || "bullets")}
          </View>
        ) : null}

        {/* Declaration and Signature block */}
        {isShown("declaration") && (
          <View wrap={false} style={[styles.sectionContainer, { marginTop: 15, marginBottom: 0 }]}>
            <Text
              style={[
                getSectionHeadingStyle(),
                {
                  borderBottomWidth: 0,
                  borderTopWidth: 0,
                  borderLeftWidth: 0,
                  paddingLeft: 0,
                  backgroundColor: "transparent",
                  color: config.primaryColor,
                },
              ]}
            >
              {getSectionName("declaration", "Declaration")}
            </Text>
            <Text style={styles.declarationText}>
              {cleanText(data.declaration?.text) ||
                "I hereby declare that the above information is true and correct to the best of my knowledge."}
            </Text>

            <View style={styles.signatureBlock}>
              <View style={styles.sigLeft}>
                <Text style={{ marginBottom: 2 }}>
                  Place: {cleanText(data.declaration?.place) || ""}
                </Text>
                <Text>Date: {cleanText(data.declaration?.date) || ""}</Text>
              </View>
              <View style={styles.sigRight}>
                <Text style={{ fontStyle: "italic", fontSize: 8, opacity: 0.7, marginBottom: 8 }}>
                  signature
                </Text>
                <Text style={{ fontFamily: boldFont }}>{cleanText(p.fullName) || ""}</Text>
              </View>
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
