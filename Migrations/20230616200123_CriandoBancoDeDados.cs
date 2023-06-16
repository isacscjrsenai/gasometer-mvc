using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Gasometer.Migrations
{
    /// <inheritdoc />
    public partial class CriandoBancoDeDados : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Veiculo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tipo = table.Column<string>(type: "varchar(10)", nullable: false),
                    Marca = table.Column<string>(type: "varchar(30)", nullable: false),
                    Modelo = table.Column<string>(type: "varchar(100)", nullable: false),
                    Combustivel = table.Column<string>(type: "varchar(10)", nullable: false),
                    Ano = table.Column<int>(type: "int", nullable: false),
                    GastoPorKm = table.Column<decimal>(type: "decimal(18,0)", nullable: false),
                    Preco = table.Column<decimal>(type: "decimal(18,0)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Veiculo", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Veiculo");
        }
    }
}
