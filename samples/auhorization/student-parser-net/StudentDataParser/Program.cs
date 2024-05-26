// See https://aka.ms/new-console-template for more information

using MySql.Data.MySqlClient;

Console.WriteLine("Hello, World!");

//string pattern = @"^([A-Z]+)\s\.S\.\s([A-Z]+)$";   ALDEA F.V. ANDREI


var connectionString =
    "server=localhost;port=3306;database=Clouding;user=root;password=password";

using var connection = new MySqlConnection(connectionString);
try
{
    connection.Open();

    var data = File.ReadAllLines("data.txt");
    var index = 1;
    foreach (var student in data)
    {
        var splits = student.Split(" ");
        var firstName = splits[0];
        var lastName = splits[2];

        var userName =
            //Console.WriteLine("First name: " + firstName);
            //Console.WriteLine("Last name: " + lastName);
            $"{lastName.Substring(0, 1)}{firstName}";

        var command = connection.CreateCommand();
        command.CommandText =
            "INSERT INTO Accounts (Id, first_name, last_name,username, group_name) VALUES (@val0,@val1, @val2,@val3, @val4)";
        command.Parameters.AddWithValue("@val0", index++);
        command.Parameters.AddWithValue("@val1", firstName);
        command.Parameters.AddWithValue("@val2", lastName);
        command.Parameters.AddWithValue("@val3", userName.ToLower());
        command.Parameters.AddWithValue("@val4", splits[^1]);
        var rowsAffected = command.ExecuteNonQuery();

        Console.WriteLine($"{rowsAffected} row(s) inserted.");

        //Console.WriteLine("Username: " + userName);
        //Console.WriteLine("Group: " + splits[^1]);

        //File.AppendAllText("out.txt", $"{firstName} + {lastName} => {userName} \n");
    }
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}

Console.ReadKey();


    INSERT INTO Accounts (Id, first_name, last_name,username, group_name) VALUES ('1','Matei', 'Madalin','mamatei', 'NA')