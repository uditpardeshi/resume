import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "../resume-schema";
import { cleanText } from "../sanitize";

// Graphic template: Bold dark header block with personal details, clean slate accent tables below.
// A4 with 1/2 inch (36pt) margins.

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#222222",
    lineHeight: 1.35,
  },
  headerBlock: {
    backgroundColor: "#1e293b", // Slate-800 dark background
    padding: 12,
    color: "#ffffff",
    marginBottom: 12,
    borderRadius: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#ffffff",
    letterSpacing: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#475569",
    paddingBottom: 4,
    marginBottom: 6,
  },
  headerGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  headerCol: {
    width: "50%",
    fontSize: 8.5,
    marginBottom: 3,
  },
  headerLabel: {
    fontFamily: "Helvetica-Bold",
    color: "#94a3b8", // Light slate text
  },
  headerValue: {
    color: "#f1f5f9",
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginTop: 8,
    marginBottom: 5,
    color: "#1e293b",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
  },
  // Table styles
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#475569",
    marginBottom: 4,
    marginLeft: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#e2e8f0", // Light slate header
    fontFamily: "Helvetica-Bold",
  },
  tableCellHeader: {
    margin: 4,
    fontSize: 8.5,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
  },
  tableCell: {
    margin: 4,
    fontSize: 8,
  },
  // Columns flex ratios
  colDegree: { flex: 2, borderRightWidth: 0.5, borderColor: "#475569" },
  colInstitution: { flex: 3, borderRightWidth: 0.5, borderColor: "#475569" },
  colBoard: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#475569" },
  colYear: { flex: 1.25, borderRightWidth: 0.5, borderColor: "#475569", textAlign: "center" },
  colGrade: { flex: 1.25, textAlign: "center" },

  colOrg: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#475569" },
  colRole: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#475569" },
  colDuration: { flex: 2, borderRightWidth: 0.5, borderColor: "#475569", textAlign: "center" },
  colResp: { flex: 4 },

  textBlock: {
    marginLeft: 5,
    fontSize: 9,
    lineHeight: 1.4,
  },
  declarationText: {
    fontFamily: "Helvetica-Oblique",
    marginLeft: 5,
    marginBottom: 15,
    fontSize: 9,
    lineHeight: 1.4,
  },
  signatureBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 5,
    fontSize: 9,
  },
  sigLeft: {
    flexDirection: "column",
  },
  sigRight: {
    alignItems: "flex-end",
  },
});

export function GraphicResume({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <Document title={`${cleanText(p.fullName)} - Resume`} author={cleanText(p.fullName)}>
      <Page size="A4" style={styles.page}>
        {/* Bold Dark Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.title}>{cleanText(p.fullName) || "Resume / Curriculum Vitae"}</Text>
          <View style={styles.headerGrid}>
            <View style={styles.headerCol}>
              <Text>
                <Text style={styles.headerLabel}>Address: </Text>
                <Text style={styles.headerValue}>{cleanText(p.address) || "-"}</Text>
              </Text>
            </View>
            <View style={styles.headerCol}>
              <Text>
                <Text style={styles.headerLabel}>Mobile: </Text>
                <Text style={styles.headerValue}>{cleanText(p.phone) || "-"}</Text>
              </Text>
            </View>
            <View style={styles.headerCol}>
              <Text>
                <Text style={styles.headerLabel}>Email ID: </Text>
                <Text style={styles.headerValue}>{cleanText(p.email) || "-"}</Text>
              </Text>
            </View>
            <View style={styles.headerCol}>
              <Text>
                <Text style={styles.headerLabel}>Date of Birth: </Text>
                <Text style={styles.headerValue}>{cleanText(p.dob) || "-"}</Text>
              </Text>
            </View>
            <View style={styles.headerCol}>
              <Text>
                <Text style={styles.headerLabel}>Languages: </Text>
                <Text style={styles.headerValue}>{cleanText(p.languages) || "-"}</Text>
              </Text>
            </View>

          </View>
        </View>

        {/* 2) Educational Details */}
        <View wrap={false} style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>2) Educational Details :-</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.colDegree}>
                <Text style={styles.tableCellHeader}>Degree / Course</Text>
              </View>
              <View style={styles.colInstitution}>
                <Text style={styles.tableCellHeader}>Institution</Text>
              </View>
              <View style={styles.colBoard}>
                <Text style={styles.tableCellHeader}>Board / Univ</Text>
              </View>
              <View style={styles.colYear}>
                <Text style={styles.tableCellHeader}>Year</Text>
              </View>
              <View style={styles.colGrade}>
                <Text style={styles.tableCellHeader}>Grade</Text>
              </View>
            </View>
            {/* Table Body */}
            {data.education.length > 0 ? (
              data.education.map((ed, i) => (
                <View
                  key={i}
                  style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#475569" }]}
                >
                  <View style={styles.colDegree}>
                    <Text style={styles.tableCell}>{cleanText(ed.degree) || "-"}</Text>
                  </View>
                  <View style={styles.colInstitution}>
                    <Text style={styles.tableCell}>{cleanText(ed.institution) || "-"}</Text>
                  </View>
                  <View style={styles.colBoard}>
                    <Text style={styles.tableCell}>{cleanText(ed.board) || "-"}</Text>
                  </View>
                  <View style={styles.colYear}>
                    <Text style={styles.tableCell}>{cleanText(ed.toYear) || "-"}</Text>
                  </View>
                  <View style={styles.colGrade}>
                    <Text style={styles.tableCell}>{cleanText(ed.grade) || "-"}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#475569" }]}>
                <View style={{ flex: 1, padding: 6 }}>
                  <Text style={[styles.tableCell, { textAlign: "center", fontStyle: "italic" }]}>
                    No education records added yet.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* 3) Experience Details */}
        <View wrap={false} style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>3) Experience Details:-</Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.colOrg}>
                <Text style={styles.tableCellHeader}>Organisation</Text>
              </View>
              <View style={styles.colRole}>
                <Text style={styles.tableCellHeader}>Designation</Text>
              </View>
              <View style={styles.colDuration}>
                <Text style={styles.tableCellHeader}>Duration</Text>
              </View>
              <View style={styles.colResp}>
                <Text style={styles.tableCellHeader}>Responsibilities</Text>
              </View>
            </View>
            {/* Table Body */}
            {data.experience.length > 0 ? (
              data.experience.map((e, i) => (
                <View
                  key={i}
                  style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#475569" }]}
                >
                  <View style={styles.colOrg}>
                    <Text style={styles.tableCell}>{cleanText(e.company) || "-"}</Text>
                  </View>
                  <View style={styles.colRole}>
                    <Text style={styles.tableCell}>{cleanText(e.role) || "-"}</Text>
                  </View>
                  <View style={styles.colDuration}>
                    <Text style={styles.tableCell}>
                      {e.fromDate && e.toDate
                        ? `${cleanText(e.fromDate)} - ${cleanText(e.toDate)}`
                        : "-"}
                    </Text>
                  </View>
                  <View style={styles.colResp}>
                    <Text style={styles.tableCell}>{cleanText(e.responsibilities) || "-"}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#475569" }]}>
                <View style={{ flex: 1, padding: 6 }}>
                  <Text style={[styles.tableCell, { textAlign: "center", fontStyle: "italic" }]}>
                    No experience records added yet.
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* 4) Special Achievements */}
        {data.achievements ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>4) Special Achievements:-</Text>
            <Text style={styles.textBlock}>{cleanText(data.achievements)}</Text>
          </View>
        ) : null}

        {/* 5) Strengths */}
        {data.strengths ? (
          <View wrap={false} style={styles.sectionContainer}>
            <Text style={styles.sectionHeading}>5) Strengths:</Text>
            <Text style={styles.textBlock}>{cleanText(data.strengths)}</Text>
          </View>
        ) : null}

        {/* Declaration and Signature block */}
        <View wrap={false} style={[styles.sectionContainer, { marginTop: 15, marginBottom: 0 }]}>
          <Text style={[styles.sectionHeading, { borderBottomWidth: 0 }]}>Declaration</Text>
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
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{cleanText(p.fullName) || ""}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
