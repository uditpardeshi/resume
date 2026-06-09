import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "../resume-schema";
import { cleanText } from "../sanitize";

// Minimal template: serif (Times-Roman) font, generous whitespace, elegant subtle styling.
// A4 with 1/2 inch (36pt) margins.

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    color: "#111111",
    lineHeight: 1.4,
  },
  title: {
    fontSize: 16,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 2,
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 12,
  },
  sectionHeading: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#999999",
    paddingBottom: 2,
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
    fontFamily: "Times-Bold",
    width: 130,
    fontSize: 9.5,
  },
  personalValue: {
    flex: 1,
    fontSize: 9.5,
  },
  // Table styles
  table: {
    width: "auto",
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#777777",
    marginBottom: 4,
    marginLeft: 5,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#fafafa",
    fontFamily: "Times-Bold",
  },
  tableCellHeader: {
    margin: 4,
    fontSize: 8.5,
    fontFamily: "Times-Bold",
  },
  tableCell: {
    margin: 4,
    fontSize: 8.5,
  },
  // Columns flex ratios
  colDegree: { flex: 2, borderRightWidth: 0.5, borderColor: "#777777" },
  colInstitution: { flex: 3, borderRightWidth: 0.5, borderColor: "#777777" },
  colBoard: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#777777" },
  colYear: { flex: 1.25, borderRightWidth: 0.5, borderColor: "#777777", textAlign: "center" },
  colGrade: { flex: 1.25, textAlign: "center" },

  colOrg: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#777777" },
  colRole: { flex: 2.5, borderRightWidth: 0.5, borderColor: "#777777" },
  colDuration: { flex: 2, borderRightWidth: 0.5, borderColor: "#777777", textAlign: "center" },
  colResp: { flex: 4 },

  textBlock: {
    marginLeft: 5,
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  declarationText: {
    fontFamily: "Times-Italic",
    marginLeft: 5,
    marginBottom: 15,
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  signatureBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginLeft: 5,
    fontSize: 9.5,
  },
  sigLeft: {
    flexDirection: "column",
  },
  sigRight: {
    alignItems: "flex-end",
  },
});

export function MinimalResume({ data }: { data: ResumeData }) {
  const p = data.personal;

  return (
    <Document title={`${cleanText(p.fullName)} - Resume`} author={cleanText(p.fullName)}>
      <Page size="A4" style={styles.page}>
        {/* Title Header */}
        <Text style={styles.title}>Resume / Curriculum Vitae</Text>

        {/* 1. Personal Details */}
        <View wrap={false} style={styles.sectionContainer}>
          <Text style={styles.sectionHeading}>1. Personal Details:-</Text>
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
                  style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#777777" }]}
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
              <View style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#777777" }]}>
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
                  style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#777777" }]}
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
              <View style={[styles.tableRow, { borderTopWidth: 0.5, borderColor: "#777777" }]}>
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
              <Text style={{ fontFamily: "Times-Bold" }}>{cleanText(p.fullName) || ""}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
