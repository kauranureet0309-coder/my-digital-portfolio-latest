// Security Journal Page
// Showcases mini security projects with lessons learned and security concepts applied

// Type definition for security projects
interface SecurityProject {
  id: string;
  name: string;
  lessonsLearned: string[];
  securityConcepts: string[];
}

// Sample security projects data
const securityProjects: SecurityProject[] = [
  {
    id: "secure-auth",
    name: "Secure Authentication System",
    lessonsLearned: [
      "Always hash passwords using bcrypt or similar algorithms",
      "Implement rate limiting to prevent brute force attacks",
      "Use secure session tokens with proper expiration",
    ],
    securityConcepts: [
      "Password Hashing",
      "Rate Limiting",
      "Session Management",
    ],
  },
  {
    id: "api-security",
    name: "REST API Security Hardening",
    lessonsLearned: [
      "Validate and sanitize all user inputs on the server side",
      "Use CORS headers to control cross-origin requests",
      "Implement proper error handling without exposing sensitive info",
    ],
    securityConcepts: ["Input Validation", "CORS", "Error Handling"],
  },
  {
    id: "data-encryption",
    name: "Database Encryption & Privacy",
    lessonsLearned: [
      "Encrypt sensitive data at rest using industry standards",
      "Use environment variables for secrets, never hardcode them",
      "Implement proper access controls and audit logs",
    ],
    securityConcepts: [
      "Data Encryption",
      "Secret Management",
      "Access Control",
    ],
  },
];

export default function SecurityJournalPage() {
  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "1000px",
        margin: "0 auto",
        fontFamily: "var(--font-sans, system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* Page Header Section */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#1a1a1a",
          }}
        >
          Security Journal
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
          }}
        >
          Documenting lessons learned and security concepts applied across mini
          projects
        </p>
      </section>

      {/* Projects Grid Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* Map through security projects and render each one */}
        {securityProjects.map((project) => (
          <article
            key={project.id}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
              padding: "1.5rem",
              backgroundColor: "#fafafa",
              transition: "box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.boxShadow = "none")
            }
          >
            {/* Project Name */}
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "1rem",
                color: "#2c3e50",
              }}
            >
              {project.name}
            </h2>

            {/* Link to Project */}
            <p style={{ marginBottom: "1.5rem" }}>
              <a
                href="https://www.anureet.cloud/projects"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#0066cc",
                  textDecoration: "none",
                  fontWeight: "500",
                  borderBottom: "1px solid #0066cc",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "#0052a3")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.color =
                    "#0066cc")
                }
              >
                View Project →
              </a>
            </p>

            {/* Lessons Learned Subsection */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#333",
                }}
              >
                Lessons Learned:
              </h3>
              <ul
                style={{
                  marginLeft: "1.5rem",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                {project.lessonsLearned.map((lesson, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {lesson}
                  </li>
                ))}
              </ul>
            </div>

            {/* Security Concepts Subsection */}
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  marginBottom: "0.75rem",
                  color: "#333",
                }}
              >
                Security Concepts Applied:
              </h3>
              <ul
                style={{
                  marginLeft: "1.5rem",
                  color: "#555",
                  lineHeight: "1.6",
                }}
              >
                {project.securityConcepts.map((concept, index) => (
                  <li key={index} style={{ marginBottom: "0.5rem" }}>
                    {concept}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>

      {/* Footer Section */}
      <section
        style={{
          textAlign: "center",
          paddingTop: "2rem",
          borderTop: "1px solid #e0e0e0",
          color: "#999",
          fontSize: "0.9rem",
        }}
      >
        <p>
          Check out more projects on{" "}
          <a
            href="https://www.anureet.cloud/projects"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0066cc",
              textDecoration: "none",
            }}
          >
            my project page
          </a>
        </p>
      </section>
    </main>
  );
}
