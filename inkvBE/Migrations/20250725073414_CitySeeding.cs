using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace inkvBE.Migrations
{
    /// <inheritdoc />
    public partial class CitySeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Cities",
                column: "CityName",
                values: new string[] {
                    "Vilnius",
                    "Kaunas",
                    "Klaipėda",
                    "Šiauliai",
                    "Panevėžys",
                    "Alytus",
                    "Marijampolė",
                    "Mažeikiai",
                    "Jonava",
                    "Utena",
                    "Kėdainiai",
                    "Telšiai",
                    "Visaginas",
                    "Tauragė",
                    "Ukmergė",
                    "Plungė",
                    "Kretinga",
                    "Radviliškis",
                    "Druskininkai",
                    "Palanga",
                    "Šilutė",
                    "Rokiškis",
                    "Jurbarkas",
                    "Elektrėnai",
                    "Biržai",
                    "Šakiai",
                    "Varėna",
                    "Švenčionys",
                    "Pasvalys",
                    "Lazdijai",
                    "Zarasai",
                    "Molėtai",
                    "Trakai",
                    "Anykščiai",
                    "Kaišiadorys",
                    "Ignalina",
                    "Kelmė",
                    "Širvintos",
                    "Akmenė",
                    "Skuodas"
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
