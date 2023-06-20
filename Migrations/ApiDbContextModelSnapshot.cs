﻿// <auto-generated />
using System;
using JobBoard.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace JobBoard.Migrations
{
    [DbContext(typeof(ApiDbContext))]
    partial class ApiDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("JobBoard.Models.Application", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("AppliedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("JobId")
                        .HasColumnType("int");

                    b.Property<string>("Resume")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("JobId");

                    b.HasIndex("UserId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("JobBoard.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("JobBoard.Models.Employer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("ContactEmail")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("ContactName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("ContactPhone")
                        .IsRequired()
                        .HasMaxLength(20)
                        .IsUnicode(false)
                        .HasColumnType("varchar(20)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Employers");
                });

            modelBuilder.Entity("JobBoard.Models.Job", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("text");

                    b.Property<int>("EmployerId")
                        .HasColumnType("int");

                    b.Property<string>("JobType")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("LocationId")
                        .HasColumnType("int");

                    b.Property<decimal?>("Salary")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("SkillId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("EmployerId");

                    b.HasIndex("LocationId");

                    b.HasIndex("SkillId");

                    b.ToTable("Jobs");
                });

            modelBuilder.Entity("JobBoard.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("City")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("State")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("JobBoard.Models.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("RoleName")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("JobBoard.Models.Skill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Skills");
                });

            modelBuilder.Entity("JobBoard.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Name")
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .IsUnicode(false)
                        .HasColumnType("varchar(max)");

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("JobBoard.Models.Application", b =>
                {
                    b.HasOne("JobBoard.Models.Job", "Job")
                        .WithMany("Applications")
                        .HasForeignKey("JobId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("JobBoard.Models.User", "User")
                        .WithMany("Applications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Job");

                    b.Navigation("User");
                });

            modelBuilder.Entity("JobBoard.Models.Employer", b =>
                {
                    b.HasOne("JobBoard.Models.User", "User")
                        .WithMany("Employers")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("JobBoard.Models.Job", b =>
                {
                    b.HasOne("JobBoard.Models.Category", "Category")
                        .WithMany("Jobs")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("JobBoard.Models.Employer", "Employer")
                        .WithMany("Jobs")
                        .HasForeignKey("EmployerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("JobBoard.Models.Location", "Location")
                        .WithMany("Jobs")
                        .HasForeignKey("LocationId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("JobBoard.Models.Skill", "Skill")
                        .WithMany("Jobs")
                        .HasForeignKey("SkillId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("Employer");

                    b.Navigation("Location");

                    b.Navigation("Skill");
                });

            modelBuilder.Entity("JobBoard.Models.User", b =>
                {
                    b.HasOne("JobBoard.Models.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("JobBoard.Models.Category", b =>
                {
                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("JobBoard.Models.Employer", b =>
                {
                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("JobBoard.Models.Job", b =>
                {
                    b.Navigation("Applications");
                });

            modelBuilder.Entity("JobBoard.Models.Location", b =>
                {
                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("JobBoard.Models.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("JobBoard.Models.Skill", b =>
                {
                    b.Navigation("Jobs");
                });

            modelBuilder.Entity("JobBoard.Models.User", b =>
                {
                    b.Navigation("Applications");

                    b.Navigation("Employers");
                });
#pragma warning restore 612, 618
        }
    }
}
