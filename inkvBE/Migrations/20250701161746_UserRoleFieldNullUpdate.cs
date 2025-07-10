using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class UserRoleFieldNullUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            UPDATE ""Users"" 
            SET ""Role"" = 'user'
            WHERE ""Role"" IS NULL
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
