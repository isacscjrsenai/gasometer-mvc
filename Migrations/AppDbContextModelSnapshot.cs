﻿// <auto-generated />
using System;
using Gasometer.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Gasometer.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Veiculo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Ano")
                        .HasColumnType("int")
                        .HasColumnName("Ano");

                    b.Property<string>("Combustivel")
                        .IsRequired()
                        .HasColumnType("varchar(10)")
                        .HasColumnName("Combustivel");

                    b.Property<decimal?>("GastoPorKm")
                        .IsRequired()
                        .HasColumnType("decimal")
                        .HasColumnName("GastoPorKm");

                    b.Property<string>("Marca")
                        .IsRequired()
                        .HasColumnType("varchar(30)")
                        .HasColumnName("Marca");

                    b.Property<string>("Modelo")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("Modelo");

                    b.Property<decimal?>("Preco")
                        .IsRequired()
                        .HasColumnType("decimal")
                        .HasColumnName("Preco");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasColumnType("varchar(10)")
                        .HasColumnName("Tipo");

                    b.HasKey("Id");

                    b.ToTable("Veiculo", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
