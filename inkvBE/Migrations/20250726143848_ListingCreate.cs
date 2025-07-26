using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class ListingCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ListingName",
                table: "Listings",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "CityId",
                table: "Listings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ConditionId",
                table: "Listings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreationDate",
                table: "Listings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Listings",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ModificationDate",
                table: "Listings",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Listings",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Listings",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeId",
                table: "Listings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Listings",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Listings_CityId",
                table: "Listings",
                column: "CityId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_ConditionId",
                table: "Listings",
                column: "ConditionId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_StatusId",
                table: "Listings",
                column: "StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_TypeId",
                table: "Listings",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_UserId",
                table: "Listings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Cities_CityId",
                table: "Listings",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_ListingConditions_ConditionId",
                table: "Listings",
                column: "ConditionId",
                principalTable: "ListingConditions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings",
                column: "StatusId",
                principalTable: "ListingStatuses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Types_TypeId",
                table: "Listings",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Listings_Users_UserId",
                table: "Listings",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Cities_CityId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_ListingConditions_ConditionId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_ListingStatuses_StatusId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Types_TypeId",
                table: "Listings");

            migrationBuilder.DropForeignKey(
                name: "FK_Listings_Users_UserId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_CityId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_ConditionId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_StatusId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_TypeId",
                table: "Listings");

            migrationBuilder.DropIndex(
                name: "IX_Listings_UserId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "CityId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "ConditionId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "CreationDate",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "ModificationDate",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "TypeId",
                table: "Listings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Listings");

            migrationBuilder.AlterColumn<string>(
                name: "ListingName",
                table: "Listings",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);
        }
    }
}
