using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class ListingStatusSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "ListingStatuses",
                column: "Status",
                values: new string[] {
                    "available",
                    "reserved",
                    "sold"
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
