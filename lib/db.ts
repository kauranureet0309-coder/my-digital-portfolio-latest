import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { boolean, pgTable, serial, text, timestamp, varchar, json } from "drizzle-orm/pg-core";


console.log("Initializing database connection...");
// Determine the database connection string
let connectionString: string;

// If DATABASE_URL is provided, use it directly
if (process.env.DATABASE_URL) {
  connectionString = process.env.DATABASE_URL;
  console.log("Using DATABASE_URL from environment");
  
  // Log the host being used (mask credentials for security)
  try {
    const url = new URL(connectionString);
    console.log(`Database host: ${url.hostname}`);
  } catch (e) {
    console.log("Could not parse DATABASE_URL");
  }
}
// Otherwise, construct from individual PG* variables
else if (
  process.env.PGHOST &&
  process.env.PGUSER &&
  process.env.PGDATABASE &&
  process.env.PGPASSWORD
) {
  connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`;
  console.log("Using PG* environment variables");
}
// Fallback (should not happen if environment variables are properly set)
else {
  console.warn(
    "No database credentials found in environment variables. Please set DATABASE_URL or PG* environment variables."
  );
  connectionString = "";
}

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Please configure your database connection string in the .env file."
  );
}

// Create a SQL query executor using the Neon serverless driver with custom fetch options
const sql = neon(connectionString, {
  // Add connection timeout and retry logic
  fetchOptions: {
    timeout: 30000, // 30 second timeout
  },
});

// Create a Drizzle instance
export const db = drizzle(sql);

// Define the subscribers table schema - for newsletter subscribers only
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define the users table schema - for authentication and role-based access
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  clerkId: text("clerk_id").notNull().unique(),
  role: varchar("role", { length: 20 }).default("user").notNull(),
  isFirstUser: boolean("is_first_user").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define the blog posts table schema
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  author: text("author").notNull(),
  readTime: text("read_time"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Define the projects table schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(), // Store the icon name as a string
  items: json("items").notNull(), // Store items as a JSON array
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact submissions table removed as requested
