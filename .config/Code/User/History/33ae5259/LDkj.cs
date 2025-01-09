using backend;
using NUnit.Framework;

namespace Tests;


[TestFixture]
public class Tests
{
    private int dumb;

    [SetUp]
    public void Setup()
    {
        var weatherForecast = new WeatherForecast();
        dumb = weatherForecast.ForDumbTest;
    }

    [Test]
    public void Test_That_Pass()
    {
        Assert.That(dumb, Is.EqualTo(2));
    }
}
