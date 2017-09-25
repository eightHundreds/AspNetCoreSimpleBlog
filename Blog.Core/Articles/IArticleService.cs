﻿using Blog.Core.Articles.Dto;
using Blog.Core.Articles.Model;
using Blog.Domain.Service;
using Blog.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Blog.Core.Articles
{
    public interface IArticleService : IDomainService
    {
        Task<PagedResultDto<Article>> GetArticleByPageAsync(QueryAriticelInputDto pagedResult);
        Task AddArticle(Article newArticle);
        Task UpdateArticle(Article article);
    }
}