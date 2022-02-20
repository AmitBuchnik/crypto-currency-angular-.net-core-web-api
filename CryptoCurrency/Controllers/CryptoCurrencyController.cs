using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace CryptoCurrency.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CryptoCurrencyController : ControllerBase
    {
        private const int DEFAULT_NUM_RECORDS = 20;
        private readonly IConfiguration _configuration;
        private static readonly HttpClient client;

        static CryptoCurrencyController()
        {
            client = new HttpClient()
            {
                BaseAddress = new Uri("https://data.messari.io")
            };
            client.DefaultRequestHeaders.Add("x-messari-api-key", "36698dd3-9e43-43fe-aec8-48f5532944da");
        }

        public CryptoCurrencyController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<string> GetCryptoCurrencyAsync(int records = DEFAULT_NUM_RECORDS)
        {
            var url = string.Format("/api/v1/assets?fields=name,symbol,metrics/market_data/price_usd,metrics/marketcap/current_marketcap_usd&limit={0}", records);
            string stringResponse = null;
            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                stringResponse = await response.Content.ReadAsStringAsync();
            }
            else
            {
                throw new HttpRequestException(response.ReasonPhrase);
            }

            return stringResponse;
        }

    }
}
