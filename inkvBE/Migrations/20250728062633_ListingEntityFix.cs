using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class ListingEntityFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Listings",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings",
                column: "StatusId",
                principalTable: "ListingStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings");

            migrationBuilder.AlterColumn<int>(
                name: "StatusId",
                table: "Listings",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings",
                column: "StatusId",
                principalTable: "ListingStatuses",
                principalColumn: "Id");
        }
    }
}
