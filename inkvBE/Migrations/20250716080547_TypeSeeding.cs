using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class TypeSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Types",
                columns: new string[] { "Id", "TypeName", "SubcategoryId" },
                values: new object[,]
                {
                    { 1, "Automobilių supirkimas", 1 },
                    { 2, "Acura", 1 },
                    { 3, "Aixam", 1 },
                    { 4, "Alfa Romeo", 1 },
                    { 5, "Alpina", 1 },
                    { 6, "Aston Martin", 1 },
                    { 7, "Audi", 1 },
                    { 8, "Baic", 1 },
                    { 9, "BELLIER", 1 },
                    { 10, "Bentley", 1 },
                    { 11, "BMW", 1 },
                    { 12, "Buick", 1 },
                    { 13, "Cadillac", 1 },
                    { 14, "Chevrolet", 1 },
                    { 15, "Chrysler", 1 },
                    { 16, "Citroen", 1 },
                    { 17, "Cupra", 1 },
                    { 18, "Dacia", 1 },
                    { 19, "Daewoo", 1 },
                    { 20, "Daihatsu", 1 },
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
